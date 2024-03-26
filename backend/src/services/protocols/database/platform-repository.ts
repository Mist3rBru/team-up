import type { Game } from '#domain/entities/game-entity.js'
import type { Platform } from '#domain/entities/platform-entity.js'

export abstract class ICreatePlatformRepository {
  abstract create(platform: Platform): Promise<void>
}

export abstract class IListPlatformsRepository {
  abstract list(): Promise<Platform[]>
}

export abstract class IListPlatformGamesRepository {
  abstract listGames(platformId: string): Promise<Game[]>
}
