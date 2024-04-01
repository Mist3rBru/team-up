import { Platform } from '#domain/entities/platform-entity.js'
import { Team } from '#domain/entities/team-entity.js'
import { UUID } from '#domain/entities/uuid.js'

export class Game {
  private readonly props: Game.Props

  constructor(params: Game.Params) {
    this.props = {
      ...params,
      id: new UUID(params.id),
      createdAt: params.createdAt ?? new Date(),
      updatedAt: params.updatedAt ?? new Date(),

      platforms: params.platforms?.map(platform => new Platform(platform)),
      teams: params.teams?.map(team => new Team(team)),
    }
  }

  get id(): string {
    return this.props.id.value
  }

  get img(): string {
    return this.props.img
  }

  get name(): string {
    return this.props.name
  }

  get createdAt(): Date {
    return this.props.createdAt
  }

  get updatedAt(): Date {
    return this.props.updatedAt
  }

  get platforms(): Platform[] | undefined {
    return this.props.platforms
  }

  get teams(): Team[] | undefined {
    return this.props.teams
  }
}

export namespace Game {
  export interface Props {
    id: UUID
    img: string
    name: string
    createdAt: Date
    updatedAt: Date

    platforms?: Platform[]
    teams?: Team[]
  }

  export interface Params {
    id?: string
    img: string
    name: string
    createdAt?: Date
    updatedAt?: Date

    platforms?: Platform.Params[]
    teams?: Team.Params[]
  }
}
