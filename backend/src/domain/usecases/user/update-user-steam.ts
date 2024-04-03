import type { User } from '#domain/entities/user-entity.js'

export abstract class IUpdateUserSteam {
  abstract update(
    data: IUpdateUserSteam.Params
  ): Promise<IUpdateUserSteam.Result>
}

export namespace IUpdateUserSteam {
  export interface Params {
    steamId: string
    token: string
  }

  export type Result = User
}
