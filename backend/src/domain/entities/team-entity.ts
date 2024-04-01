import { Game } from '#domain/entities/game-entity.js'
import { User } from '#domain/entities/user-entity.js'
import { UUID } from '#domain/entities/uuid.js'

export class Team {
  private readonly props: Team.Props

  static readonly MAX_TAG_LENGTH = 15

  constructor(params: Team.Params) {
    this.props = {
      ...params,
      id: new UUID(params.id),
      createdAt: params.createdAt ?? new Date(),
      updatedAt: params.updatedAt ?? new Date(),

      game: params.game && new Game(params.game),
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
    return (
      // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
      this.props.name ||
      // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
      this.members?.map(member => member.displayName).join(', ') ||
      ''
    )
  }

  get description(): string {
    return this.props.description
  }

  get isOpen(): boolean {
    return this.props.isOpen
  }

  get isPublic(): boolean {
    return this.props.isPublic
  }

  get tags(): string[] {
    return this.props.tags
  }

  get createdAt(): Date {
    return this.props.createdAt
  }

  get updatedAt(): Date {
    return this.props.updatedAt
  }

  get game(): Game | undefined {
    return this.props.game
  }

  get members(): User[] | undefined {
    return this.props.members
  }
}

export namespace Team {
  export interface Props {
    id: UUID
    gameId: string
    name?: string
    description: string
    isOpen: boolean
    isPublic: boolean
    tags: string[]
    createdAt: Date
    updatedAt: Date

    game?: Game
    members?: User[]
  }

  export interface Params {
    id?: string
    gameId: string
    name?: string
    description: string
    isOpen: boolean
    isPublic: boolean
    tags: string[]
    createdAt?: Date
    updatedAt?: Date

    game?: Game.Params
    members?: User.Params[]
  }
}
