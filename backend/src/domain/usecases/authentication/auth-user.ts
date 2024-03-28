import type { User } from '#domain/entities/user-entity.js'

export abstract class IAuthUser {
  abstract auth(data: IAuthUser.Params): Promise<IAuthUser.Result>
}

export namespace IAuthUser {
  export interface Params {
    name: string
    password: string
  }

  export interface Result {
    user: User
    token: string
  }
}
