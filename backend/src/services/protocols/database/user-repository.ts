import type { Game } from '#domain/entities/game-entity.js'
import type { Platform } from '#domain/entities/platform-entity.js'
import type { User } from '#domain/entities/user-entity.js'

export abstract class ICreateUserRepository {
  abstract create(data: User): Promise<void>
}

export abstract class IFindUserByIdRepository {
  abstract findById(userId: string): Promise<User | null>
}

export abstract class IFindUserByEmailRepository {
  abstract findByEmail(email: string): Promise<User | null>
}

export abstract class IListUserGamesRepository {
  abstract listGames(userId: string): Promise<Game[]>
}

export abstract class IListUserPlatformsRepository {
  abstract listPlatforms(userId: string): Promise<Platform[]>
}
