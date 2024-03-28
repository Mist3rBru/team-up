export abstract class IUpdateUserPassword {
  abstract update(data: IUpdateUserPassword.Params): Promise<void>
}

export namespace IUpdateUserPassword {
  export interface Params {
    data: {
      password: string
      confirmPassword: string
    }
    token: string
  }
}
