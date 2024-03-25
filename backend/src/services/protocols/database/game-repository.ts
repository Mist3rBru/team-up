import type { Team } from '#domain/entities/team-entity.js'

export abstract class IListGameTeamsRepository {
  abstract listTeams(gameId: string): Promise<Team[]>
}
