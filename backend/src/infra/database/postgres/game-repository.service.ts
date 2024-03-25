import { Game } from '#domain/entities/game-entity.js'
import { Team } from '#domain/entities/team-entity.js'
import { GameMapper } from '#domain/mappers/game-mapper.js'
import type { IListGameTeamsRepository } from '#services/protocols/database/game-repository.js'
import { Injectable } from '@nestjs/common'
import { PrismaService } from './prisma.service'

interface IGameRepository extends IListGameTeamsRepository {}

@Injectable()
export class GameRepository implements IGameRepository {
  constructor(private readonly db: PrismaService) {}

  async create(data: Game): Promise<void> {
    await this.db.game.create({
      data: new GameMapper(data).toPrisma(),
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
        userTeam: {
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
          members: d.userTeam.flatMap(({ user }) => user),
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

  async update(data: Game): Promise<void> {
    await this.db.game.update({
      data: new GameMapper(data).toPrisma(),
      where: {
        id: data.id,
      },
    })
  }

  async delete(id: string): Promise<void> {
    await this.db.game.delete({
      where: {
        id,
      },
    })
  }
}
