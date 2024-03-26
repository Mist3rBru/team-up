import type { Game } from '#domain/entities/game-entity.js'

export abstract class IListUserGames {
  abstract listGames(userId: string): Promise<Game[]>
}
