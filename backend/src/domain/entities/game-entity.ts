import { UUID } from '#domain/entities/uuid.js'

export class Game {
  private readonly props: Game.Props

  constructor(params: Game.Params) {
    this.props = {
      ...params,
      id: new UUID(params.id),
      createdAt: params.createdAt ?? new Date(),
      updatedAt: params.createdAt ?? new Date(),
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
}

export namespace Game {
  export interface Props {
    id: UUID
    img: string
    name: string
    createdAt: Date
    updatedAt: Date
  }

  export interface Params {
    id?: string
    img: string
    name: string
    createdAt?: Date
    updatedAt?: Date
  }
}
