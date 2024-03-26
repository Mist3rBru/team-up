import type { Platform } from '#domain/entities/platform-entity.js'

export abstract class ICreatePlatform {
  abstract create(data: ICreatePlatform.Params): Promise<ICreatePlatform.Result>
}

export namespace ICreatePlatform {
  export type Params = OnlyRequired<Platform.Params>

  export type Result = Platform
}
