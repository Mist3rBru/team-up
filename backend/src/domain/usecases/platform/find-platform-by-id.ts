import type { Platform } from '#domain/entities/platform-entity.js'

export abstract class IFindPlatformById {
  abstract findById(platformId: string): Promise<Platform>
}
