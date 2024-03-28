import { Game } from '#domain/entities/game-entity.js'
import { Platform } from '#domain/entities/platform-entity.js'
import { Team } from '#domain/entities/team-entity.js'
import { User } from '#domain/entities/user-entity.js'
import { UserMapper } from '#domain/mappers/user-mapper.js'
import type {
  ICreateUserRepository,
  IFindUserByEmailRepository,
  IFindUserByIdRepository,
  IFindUserByNameRepository,
  IListUserGamesRepository,
  IListUserPlatformsRepository,
  IListUserTeamsRepository,
} from '#services/protocols/database/user-repository.js'
import { PrismaService } from '#infra/database/postgres/prisma.service.js'
import { Injectable } from '@nestjs/common'

interface IUserRepository
  extends ICreateUserRepository,
    IFindUserByEmailRepository,
    IFindUserByIdRepository,
    IFindUserByNameRepository,
    IListUserGamesRepository,
    IListUserPlatformsRepository,
    IListUserTeamsRepository {}

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly db: PrismaService) {}

  async create(data: User): Promise<void> {
    await this.db.user.create({
      data: new UserMapper(data).toPrisma(),
    })
  }

  async findById(id: string): Promise<User | null> {
    const data = await this.db.user.findFirst({
      where: {
        OR: [{ id }, { steamId: id }],
      },
    })

    if (!data) {
      return null
    }

    return new User(data)
  }

  async findByEmail(email: string): Promise<User | null> {
    const data = await this.db.user.findUnique({
      where: {
        email,
      },
    })

    if (!data) {
      return null
    }

    return new User(data)
  }

  async findByName(name: string): Promise<User | null> {
    const data = await this.db.user.findUnique({
      where: {
        name,
      },
    })

    if (!data) {
      return null
    }

    return new User(data)
  }

  async update(data: User): Promise<void> {
    await this.db.user.update({
      data: new UserMapper(data).toPrisma(),
      where: {
        id: data.id,
      },
    })
  }

  async listGames(userId: string): Promise<Game[]> {
    const data = await this.db.game.findMany({
      where: {
        userGames: {
          some: {
            userId,
          },
        },
      },
      include: {
        gamePlatforms: {
          select: {
            platform: true,
          },
        },
      },
    })

    return data.map(
      d =>
        new Game({
          ...d,
          platforms: d.gamePlatforms.map(({ platform }) => platform),
        })
    )
  }

  async listPlatforms(userId: string): Promise<Platform[]> {
    const data = await this.db.platform.findMany({
      where: {
        userPlatforms: {
          some: {
            userId,
          },
        },
      },
    })

    return data.map(d => new Platform(d))
  }

  async listTeams(userId: string): Promise<Team[]> {
    const data = await this.db.team.findMany({
      where: {
        members: {
          some: {
            userId,
          },
        },
      },
      include: {
        game: true,
        members: {
          select: {
            user: true,
          },
        },
      },
    })

    return data.map(
      d =>
        new Team({
          ...d,
          members: d.members.map(({ user }) => user),
        })
    )
  }
}
