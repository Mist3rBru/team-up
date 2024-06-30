import { Platform } from '#domain/entities/platform-entity.js'
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
      players: params.players,
    }
  }

  get id(): string {
    return this.props.id.value
  }

  get bannerImg(): string {
    return this.props.bannerImg
  }

  get profileImg(): string {
    return this.props.profileImg
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

  get players(): Game.Player[] | undefined {
    return this.props.players
  }
}

export namespace Game {
  export interface Player {
    id: string
    name: string
    playTime: string
    rank: string
  }

  export interface Props {
    id: UUID
    bannerImg: string
    profileImg: string
    name: string
    createdAt: Date
    updatedAt: Date

    platforms?: Platform[]
    players?: Player[]
  }

  export interface Params {
    id?: string
    bannerImg: string
    profileImg: string
    name: string
    createdAt?: Date
    updatedAt?: Date

    platforms?: Platform.Params[]
    players?: Player[]
  }
}
