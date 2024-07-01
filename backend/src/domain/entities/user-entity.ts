import { UUID } from '#domain/entities/uuid.js'

export class User {
  private readonly props: User.Props

  static readonly MIN_PASSWORD_LENGTH = 8

  static formatName(name: string): string {
    return name.normalize('NFD').trim().replaceAll(/\s+/g, '.').toLowerCase()
  }

  constructor(params: User.Params) {
    this.props = {
      ...params,
      id: new UUID(params.id),
      steamId: params.steamId ?? null,
      email: params.email ?? null,
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

  set steamId(steamId: string) {
    this.props.steamId = steamId
    this.update()
  }

  get img(): string {
    return (
      // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
      this.props.img ||
      `${process.env.APP_HOST}/public/uploads/img/default-user-avatar.jpg`
    )
  }

  get name(): string {
    return User.formatName(this.props.name)
  }

  set name(name: string) {
    this.props.name = name
    this.update()
  }

  get displayName(): string {
    return this.props.displayName
  }

  set displayName(displayName: string) {
    this.props.displayName = displayName
    this.update()
  }

  get email(): string | null {
    return this.props.email
  }

  set email(email: string) {
    this.props.email = email
    this.update()
  }

  get password(): string {
    return this.props.password
  }

  set password(password: string) {
    this.props.password = password
    this.update()
  }

  get contacts(): User.Contact[] | undefined {
    return this.props.contacts
  }

  get createdAt(): Date {
    return this.props.createdAt
  }

  get updatedAt(): Date {
    return this.props.updatedAt
  }

  private update(): void {
    this.props.updatedAt = new Date()
  }
}

export namespace User {
  export interface Contact {
    id: string
    userId: string
    platform: string
    name: string
    createdAt: Date
  }

  export interface Props {
    id: UUID
    steamId: string | null
    img?: string
    name: string
    displayName: string
    email: string | null
    password: string
    isModerator?: boolean
    createdAt: Date
    updatedAt: Date
    contacts?: Contact[]
  }

  export interface Params {
    id?: string
    steamId?: string | null
    img?: string
    name: string
    displayName: string
    email?: string | null
    password: string
    isModerator?: boolean
    createdAt?: Date
    updatedAt?: Date
    contacts?: Contact[]
  }
}
