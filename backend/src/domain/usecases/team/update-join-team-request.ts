export abstract class IUpdateJoinTeamRequest {
  abstract update(data: IUpdateJoinTeamRequest.Params): Promise<void>
}

export namespace IUpdateJoinTeamRequest {
  export interface Params {
    requestId: string
    token: string
    status: string
  }
}
