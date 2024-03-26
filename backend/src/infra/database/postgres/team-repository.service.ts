import type { JoinTeamRequest } from '#domain/entities/join-team-request.js'
import { Team } from '#domain/entities/team-entity.js'
import type { User } from '#domain/entities/user-entity.js'
import { JoinTeamRequestMapper } from '#domain/mappers/join-team-request-mapper.js'
import { TeamMapper } from '#domain/mappers/team-mapper.js'
import type {
  ICreateJoinTeamRequestRepository,
  ICreateTeamMemberRepository,
  ICreateTeamRepository,
  IFindTeamByIdRepository,
  IUpdateJoinTeamRequestRepository,
  IUpdateTeamMemberRepository,
} from '#services/protocols/database/team-repository.js'
import { Injectable } from '@nestjs/common'
import { PrismaService } from './prisma.service'

interface ITeamRepository
  extends ICreateTeamRepository,
    IFindTeamByIdRepository,
    ICreateTeamMemberRepository,
    IUpdateTeamMemberRepository,
    ICreateJoinTeamRequestRepository,
    IUpdateJoinTeamRequestRepository {}

@Injectable()
export class TeamRepository implements ITeamRepository {
  constructor(private readonly db: PrismaService) {}

  async create(team: Team, members: string[]): Promise<void> {
    await this.db.team.create({
      data: {
        ...new TeamMapper(team).toPrisma(),
        members: {
          create: members.map((memberId, i) => ({
            userId: memberId,
            isModerator: i === 0,
          })),
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
            user: true,
            isModerator: true,
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

  async createRequest(joinTeamRequest: JoinTeamRequest): Promise<void> {
    await this.db.joinTeamRequest.create({
      data: new JoinTeamRequestMapper(joinTeamRequest).toPrisma(),
    })
  }

  async updateRequest(joinTeamRequest: JoinTeamRequest): Promise<void> {
    await this.db.joinTeamRequest.update({
      data: new JoinTeamRequestMapper(joinTeamRequest).toPrisma(),
      where: {
        id: joinTeamRequest.id,
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
