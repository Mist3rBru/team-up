import { Game } from '#domain/entities/game-entity.js'
import { UUID } from '#domain/entities/uuid.js'

export class Platform {
  private readonly props: Platform.Props

  constructor(params: Platform.Params) {
    this.props = {
      ...params,
      id: new UUID(params.id),
      createdAt: params.createdAt ?? new Date(),
      updatedAt: params.updatedAt ?? new Date(),

      games: params.games?.map(game => new Game(game)),
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

  get games(): Game[] | undefined {
    return this.props.games
  }
}

export namespace Platform {
  export interface Props {
    id: UUID
    img: string
    name: string
    createdAt: Date
    updatedAt: Date

    games?: Game[]
  }

  export interface Params {
    id?: string
    img: string
    name: string
    createdAt?: Date
    updatedAt?: Date

    games?: Game.Params[]
  }
}
