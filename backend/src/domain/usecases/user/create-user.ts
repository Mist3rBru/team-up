import type { User } from '#domain/entities/user-entity.js'

export abstract class ICreateUser {
  abstract create(data: ICreateUser.Params): Promise<ICreateUser.Result>
}

export namespace ICreateUser {
  export type Params = OnlyRequired<User.Params>

  export interface Result {
    user: User
    token: string
  }
}
