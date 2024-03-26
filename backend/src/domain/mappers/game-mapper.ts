import type { Game } from '#domain/entities/game-entity.js'
import { PlatformMapper } from '#domain/mappers/platform-mapper.js'
import type { Game as PrismaPlatform } from '@prisma/client'

export class GameMapper {
  constructor(private readonly props: Game) {}

  public toPrisma(): PrismaPlatform {
    return {
      id: this.props.id,
      img: this.props.img,
      name: this.props.name,
      createdAt: this.props.createdAt,
      updatedAt: this.props.updatedAt,
    }
  }

  public toHttp() {
    return {
      id: this.props.id,
      img: this.props.img,
      name: this.props.name,
      createdAt: this.props.createdAt,
      updatedAt: this.props.updatedAt,

      platforms: this.props.platforms?.map(platform =>
        new PlatformMapper(platform).toHttp()
      ),
    }
  }
}
