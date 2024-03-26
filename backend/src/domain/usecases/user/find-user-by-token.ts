import type { User } from '#domain/entities/user-entity.js'

export abstract class IFindUserByToken {
  abstract find(data: IFindUserByToken.Params): Promise<User>
}

export namespace IFindUserByToken {
  export interface Params {
    token: string
    accessList?: string[]
  }
}
