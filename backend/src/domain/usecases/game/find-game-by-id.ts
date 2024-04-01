import type { Game } from '#domain/entities/game-entity.js'

export abstract class IFindGameById {
  abstract findById(gameId: string): Promise<Game>
}
