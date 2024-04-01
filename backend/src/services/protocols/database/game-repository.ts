import type { Game } from '#domain/entities/game-entity.js'
import type { User } from '#domain/entities/user-entity.js'

export abstract class ICreateGameRepository {
  abstract create(game: Game, platforms: string[]): Promise<void>
}

export abstract class IFindGameByIdRepository {
  abstract findById(gameId: string): Promise<Game | null>
}

export abstract class IUpsertGameRepository {
  abstract upsert(game: Game, platforms: string[]): Promise<Game>
}

export abstract class IUpsertUserGameRepository {
  abstract upsertUser(game: Game, user: User): Promise<void>
}
