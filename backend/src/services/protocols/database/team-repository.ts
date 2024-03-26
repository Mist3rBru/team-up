import type { JoinTeamRequest } from '#domain/entities/join-team-request.js'
import type { Team } from '#domain/entities/team-entity.js'
import type { User } from '#domain/entities/user-entity.js'

export abstract class IFindTeamByIdRepository {
  abstract findById(teamId: string): Promise<Team | null>
}

export abstract class IFindJoinTeamRequestByIdRepository {
  abstract findRequestById(
    joinTeamRequestId: string
  ): Promise<JoinTeamRequest | null>
}

export abstract class ICreateJoinTeamRequestRepository {
  abstract createRequest(joinTeamRequest: JoinTeamRequest): Promise<void>
}

export abstract class IUpdateJoinTeamRequestRepository {
  abstract updateRequest(joinTeamRequest: JoinTeamRequest): Promise<void>
}

export abstract class ICreateTeamMemberRepository {
  abstract createMember(team: Team, user: User): Promise<void>
}

export abstract class IUpdateTeamMemberRepository {
  abstract updateMember(team: Team, user: User): Promise<void>
}
