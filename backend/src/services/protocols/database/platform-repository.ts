import type { Platform } from '#domain/entities/platform-entity.js'

export abstract class ICreatePlatformRepository {
  abstract create(platform: Platform): Promise<void>
}

export abstract class IListPlatformsRepository {
  abstract list(): Promise<Platform[]>
}

export abstract class IFindPlatformByIdRepository {
  abstract findById(platformId: string): Promise<Platform | null>
}
