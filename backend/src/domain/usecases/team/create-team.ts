import type { Team } from '#domain/entities/team-entity.js'

export abstract class ICreateTeam {
  abstract create(data: ICreateTeam.Params): Promise<Team>
}

export namespace ICreateTeam {
  export type Params = OnlyRequired<Team.Params> & {
    members: string[]
  }

  export type Result = Team
}
