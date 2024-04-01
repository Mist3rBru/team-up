import type { Team } from '#domain/entities/team-entity.js'

export abstract class IFindTeamById {
  abstract findById(teamId: string): Promise<Team>
}
