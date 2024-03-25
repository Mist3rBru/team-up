import type { Team } from '#domain/entities/team-entity.js'
import type { User } from '#domain/entities/user-entity.js'

export abstract class IFindTeamByIdRepository {
  abstract findById(teamId: string): Promise<Team | null>
}

export abstract class ICreateTeamMemberRepository {
  abstract createMember(team: Team, user: User): Promise<void>
}

export abstract class IUpdateTeamMemberRepository {
  abstract updateMember(team: Team, user: User): Promise<void>
}
