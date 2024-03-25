import type { Game } from '#domain/entities/game-entity.js'

export abstract class IListPlatformGames {
  abstract list(platformId: string): Promise<Game[]>
}
