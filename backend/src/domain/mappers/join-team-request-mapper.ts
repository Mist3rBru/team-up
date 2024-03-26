import type { JoinTeamRequest } from '#domain/entities/join-team-request.js'
import { TeamMapper } from '#domain/mappers/team-mapper.js'
import { UserMapper } from '#domain/mappers/user-mapper.js'
import type { JoinTeamRequest as PrismaJoinTeamRequest } from '@prisma/client'

export class JoinTeamRequestMapper {
  constructor(private readonly props: JoinTeamRequest) {}

  public toPrisma(): PrismaJoinTeamRequest {
    return {
      id: this.props.id,
      teamId: this.props.teamId,
      userId: this.props.userId,
      status: this.props.status,
      createdAt: this.props.createdAt,
      updatedAt: this.props.updatedAt,
    }
  }

  public toHttp() {
    return {
      id: this.props.id,
      team: this.props.team && new TeamMapper(this.props.team).toHttp(),
      user: this.props.user && new UserMapper(this.props.user).toSample(),
      status: this.props.status,
      createdAt: this.props.createdAt,
      updatedAt: this.props.updatedAt,
    }
  }
}
