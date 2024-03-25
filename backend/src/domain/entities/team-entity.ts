import { User } from '#domain/entities/user-entity.js'
import { UUID } from '#domain/entities/uuid.js'

export class Team {
  private readonly props: Team.Props

  constructor(params: Team.Params) {
    this.props = {
      ...params,
      id: new UUID(params.id),
      createdAt: params.createdAt ?? new Date(),
      updatedAt: params.createdAt ?? new Date(),

      members: params.members?.map(member => new User(member)),
    }
  }

  get id(): string {
    return this.props.id.value
  }

  get gameId(): string {
    return this.props.gameId
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

  get members(): User[] | undefined {
    return this.props.members
  }
}

export namespace Team {
  export interface Props {
    id: UUID
    gameId: string
    name: string
    createdAt: Date
    updatedAt: Date

    members?: User[]
  }

  export interface Params {
    id?: string
    gameId: string
    name: string
    createdAt?: Date
    updatedAt?: Date

    members?: User.Params[]
  }
}
