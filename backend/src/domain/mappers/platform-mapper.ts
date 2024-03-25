import type { Platform } from '#domain/entities/platform-entity.js'
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

  public toHttp() {
    return {
      id: this.props.id,
      img: this.props.img,
      name: this.props.name,
      createdAt: this.props.createdAt,
      updatedAt: this.props.updatedAt,
    }
  }
}
