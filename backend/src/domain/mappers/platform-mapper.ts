import type { Platform } from '#domain/entities/platform-entity.js'
import { GameMapper } from '#domain/mappers/game-mapper.js'
import type { Platform as PrismaPlatform } from '@prisma/client'

export class PlatformMapper {
  constructor(private readonly props: Platform) {}

  public toPrisma(): PrismaPlatform {
    return {
      id: this.props.id,
      img: this.props.img,
      name: this.props.name,
      createdAt: this.props.createdAt,
      updatedAt: this.props.updatedAt,
    }
  }

  public toHttp(): {
    id: string
    img: string
    name: string
    createdAt: Date
    updatedAt: Date
    games: ReturnType<GameMapper['toHttp']>[] | undefined
  } {
    return {
      id: this.props.id,
      img: this.props.img,
      name: this.props.name,
      createdAt: this.props.createdAt,
      updatedAt: this.props.updatedAt,

      games: this.props.games?.map(game => new GameMapper(game).toHttp()),
    }
  }
}
