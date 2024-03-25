import { Team } from '#domain/entities/team-entity.js'
import type { User } from '#domain/entities/user-entity.js'
import { TeamMapper } from '#domain/mappers/team-mapper.js'
import type {
  ICreateTeamMemberRepository,
  IFindTeamByIdRepository,
  IUpdateTeamMemberRepository,
} from '#services/protocols/database/team-repository.js'
import { Injectable } from '@nestjs/common'
import { PrismaService } from './prisma.service'

interface ITeamRepository
  extends IFindTeamByIdRepository,
    ICreateTeamMemberRepository,
    IUpdateTeamMemberRepository {}

@Injectable()
export class TeamRepository implements ITeamRepository {
  constructor(private readonly db: PrismaService) {}

  async create(team: Team, user: User): Promise<void> {
    await this.db.team.create({
      data: {
        ...new TeamMapper(team).toPrisma(),
        members: {
          create: {
            userId: user.id,
            isModerator: true,
          },
        },
      },
    })
  }

  async findById(id: string): Promise<Team | null> {
    const data = await this.db.team.findUnique({
      where: {
        id,
      },
      include: {
        members: {
          select: {
            isModerator: true,
            user: true,
          },
        },
      },
    })

    if (!data) {
      return null
    }

    return new Team({
      ...data,
      members: data.members.map(({ isModerator, user }) => ({
        ...user,
        isModerator,
      })),
    })
  }

  async update(data: Team): Promise<void> {
    await this.db.team.update({
      data: new TeamMapper(data).toPrisma(),
      where: {
        id: data.id,
      },
    })
  }

  async delete(id: string): Promise<void> {
    await this.db.team.delete({
      where: {
        id,
      },
    })
  }

  async createMember(team: Team, user: User): Promise<void> {
    await this.db.userTeam.create({
      data: {
        teamId: team.id,
        userId: user.id,
        isModerator: !!user.isModerator,
      },
    })
  }

  async updateMember(team: Team, user: User): Promise<void> {
    await this.db.userTeam.update({
      data: {
        isModerator: !!user.isModerator,
      },
      where: {
        userId_teamId: {
          teamId: team.id,
          userId: user.id,
        },
      },
    })
  }
}
