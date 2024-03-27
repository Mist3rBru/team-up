import { UUID } from '#domain/entities/uuid.js'

export class User {
  private readonly props: User.Props

  constructor(params: User.Params) {
    this.props = {
      ...params,
      id: new UUID(params.id),
      steamId: params.steamId ?? null,
      email: params.email ?? null,
      img: params.img ?? '',
      createdAt: params.createdAt ?? new Date(),
      updatedAt: params.updatedAt ?? new Date(),
    }
  }

  get id(): string {
    return this.props.id.value
  }

  get steamId(): string | null {
    return this.props.steamId
  }

  get img(): string {
    return this.props.img
  }

  get name(): string {
    return this.props.name
  }

  get email(): string | null {
    return this.props.email
  }

  get password(): string {
    return this.props.password
  }

  set password(password: string) {
    this.props.password = password
  }

  get isModerator(): boolean | undefined {
    return this.props.isModerator
  }

  get createdAt(): Date {
    return this.props.createdAt
  }

  get updatedAt(): Date {
    return this.props.updatedAt
  }
}

export namespace User {
  export interface Props {
    id: UUID
    steamId: string | null
    img: string
    name: string
    email: string | null
    password: string
    isModerator?: boolean
    createdAt: Date
    updatedAt: Date
  }

  export interface Params {
    id?: string
    steamId?: string | null
    img?: string
    name: string
    email?: string | null
    password: string
    isModerator?: boolean
    createdAt?: Date
    updatedAt?: Date
  }
}
