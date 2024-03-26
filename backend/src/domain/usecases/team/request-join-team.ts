export abstract class IRequestJoinTeam {
  abstract request(data: IRequestJoinTeam.Params): Promise<void>
}

export namespace IRequestJoinTeam {
  export interface Params {
    userId: string
    teamId: string
  }
}
