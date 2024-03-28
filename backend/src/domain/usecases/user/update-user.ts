import type { User } from '#domain/entities/user-entity.js'

export abstract class IUpdateUser {
  abstract update(data: IUpdateUser.Params): Promise<IUpdateUser.Result>
}

export namespace IUpdateUser {
  export interface Params {
    data: {
      name: string
      displayName: string
      email: string
    }
    token: string
  }

  export type Result = User
}
