import type { Game } from '#domain/entities/game-entity.js'
import { PlatformMapper } from '#domain/mappers/platform-mapper.js'
import type { Game as PrismaPlatform } from '@prisma/client'

export class GameMapper {
  constructor(private readonly props: Game) {}

  public toPrisma(): PrismaPlatform {
    return {
      id: this.props.id,
      bannerImg: this.props.profileImg,
      profileImg: this.props.profileImg,
      name: this.props.name,
      createdAt: this.props.createdAt,
      updatedAt: this.props.updatedAt,
    }
  }

  public toHttp(): {
    id: string
    bannerImg: string
    profileImg: string
    name: string
    createdAt: Date
    updatedAt: Date
    platforms: ReturnType<PlatformMapper['toHttp']>[] | undefined
    players: Game.Player[] | undefined
  } {
    return {
      id: this.props.id,
      bannerImg: this.props.bannerImg,
      profileImg: this.props.profileImg,
      name: this.props.name,
      createdAt: this.props.createdAt,
      updatedAt: this.props.updatedAt,

      platforms: this.props.platforms?.map(platform =>
        new PlatformMapper(platform).toHttp()
      ),
      players: this.props.players,
    }
  }
}
