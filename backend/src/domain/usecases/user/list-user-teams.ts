import type { Team } from '#domain/entities/team-entity.js'

export abstract class IListUserTeams {
  abstract listTeams(userId: string): Promise<Team[]>
}
