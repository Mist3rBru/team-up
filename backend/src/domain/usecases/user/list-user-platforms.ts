import type { Platform } from '#domain/entities/platform-entity.js'

export abstract class IListUserPlatforms {
  abstract listPlatforms(userId: string): Promise<Platform[]>
}
