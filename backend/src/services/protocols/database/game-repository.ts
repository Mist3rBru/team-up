import type { Game } from '#domain/entities/game-entity.js'
import type { Team } from '#domain/entities/team-entity.js'

export abstract class ICreateGameRepository {
  abstract create(game: Game, platforms: string[]): Promise<void>
}

export abstract class IListGameTeamsRepository {
  abstract listTeams(gameId: string): Promise<Team[]>
}
