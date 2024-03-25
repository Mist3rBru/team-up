import type { Team } from '#domain/entities/team-entity.js'

export abstract class IListGameTeams {
  abstract listTeams(gameId: string): Promise<Team[]>
}
