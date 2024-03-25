import type { User } from '#domain/entities/user-entity.js'
import type { User as PrismaUser } from '@prisma/client'

export class UserMapper {
  constructor(private readonly props: User) {}

  public toPrisma(): PrismaUser {
    return {
      id: this.props.id,
      img: this.props.img,
      name: this.props.name,
      email: this.props.email,
      password: this.props.password,
      createdAt: this.props.createdAt,
      updatedAt: this.props.updatedAt,
    }
  }

  public toHttp() {
    return {
      id: this.props.id,
      img: this.props.img,
      name: this.props.name,
      email: this.props.email,
      createdAt: this.props.createdAt,
      updatedAt: this.props.updatedAt,
    }
  }

  public toSample(): User.Sample {
    return {
      id: this.props.id,
      img: this.props.img,
      name: this.props.name,
    }
  }
}
