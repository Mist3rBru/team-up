import type { User } from '#domain/entities/user-entity.js'
import type { User as PrismaUser } from '@prisma/client'

export class UserMapper {
  constructor(private readonly props: User) {}

  public toPrisma(): PrismaUser {
    return {
      id: this.props.id,
      steamId: this.props.steamId,
      img: this.props.img,
      name: this.props.name,
      email: this.props.email,
      password: this.props.password,
      createdAt: this.props.createdAt,
      updatedAt: this.props.updatedAt,
    }
  }

  public toOwner() {
    return {
      id: this.props.id,
      img: this.props.img,
      name: this.props.name,
      email: this.props.email,
      createdAt: this.props.createdAt,
      updatedAt: this.props.updatedAt,
    }
  }

  public toPublic() {
    return {
      id: this.props.id,
      img: this.props.img,
      name: this.props.name,
    }
  }

  public toTeam() {
    return {
      id: this.props.id,
      img: this.props.img,
      name: this.props.name,
      isModerator: this.props.isModerator,
    }
  }

  public toSample() {
    return {
      id: this.props.id,
      img: this.props.img,
      name: this.props.name,
    }
  }
}
