import type { Team } from '#domain/entities/team-entity.js'

export abstract class IJoinTeam {
  abstract join(data: IJoinTeam.Params): Promise<Team>
}

export namespace IJoinTeam {
  export interface Params {
    userId: string
    teamId: string
  }
}
