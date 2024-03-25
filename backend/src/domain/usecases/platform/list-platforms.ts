import type { Platform } from '#domain/entities/platform-entity.js'

export abstract class IListPlatforms {
  abstract list(): Promise<Platform[]>
}
