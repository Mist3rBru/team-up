import { Game } from '#domain/entities/game-entity.js'
import { Team } from '#domain/entities/team-entity.js'
import type { User } from '#domain/entities/user-entity.js'
import { GameMapper } from '#domain/mappers/game-mapper.js'
import type {
  ICreateGameRepository,
  IListGameTeamsRepository,
  IUpsertGameRepository,
  IUpsertUserGameRepository,
} from '#services/protocols/database/game-repository.js'
import { Injectable } from '@nestjs/common'
import { PrismaService } from './prisma.service'

interface IGameRepository
  extends ICreateGameRepository,
    IUpsertGameRepository,
    IUpsertUserGameRepository,
    IListGameTeamsRepository {}

@Injectable()
export class GameRepository implements IGameRepository {
  constructor(private readonly db: PrismaService) {}

  async create(game: Game, platforms: string[]): Promise<void> {
    await this.db.game.create({
      data: {
        ...new GameMapper(game).toPrisma(),
        gamePlatforms: {
          create: platforms.map(platformId => ({ platformId })),
        },
      },
    })
  }

  async upsert(game: Game, platforms: string[]): Promise<Game> {
    const data = await this.db.game.upsert({
      create: {
        ...new GameMapper(game).toPrisma(),
        gamePlatforms: {
          createMany: {
            data: platforms.map(platformId => ({ platformId })),
          },
        },
      },
      update: {},
      where: {
        name: game.name,
      },
    })

    return new Game(data)
  }

  async upsertUser(game: Game, user: User): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const userId_gameId = {
      gameId: game.id,
      userId: user.id,
    }
    await this.db.userGame.upsert({
      create: userId_gameId,
      update: userId_gameId,
      where: { userId_gameId },
    })
  }

  async list(): Promise<Game[]> {
    const data = await this.db.game.findMany()

    return data.map(d => new Game(d))
  }

  async listTeams(gameId: string): Promise<Team[]> {
    const data = await this.db.team.findMany({
      where: {
        gameId,
      },
      include: {
        members: {
          select: {
            user: true,
            isModerator: true,
          },
        },
      },
    })

    return data.map(
      d =>
        new Team({
          ...d,
          members: d.members.map(({ user, isModerator }) => ({
            ...user,
            isModerator,
          })),
        })
    )
  }

  async findById(id: string): Promise<Game | null> {
    const data = await this.db.game.findUnique({
      where: {
        id,
      },
    })

    if (!data) {
      return null
    }

    return new Game(data)
  }

  async delete(id: string): Promise<void> {
    await this.db.game.delete({
      where: {
        id,
      },
    })
  }
}
