import { UUID } from '#domain/entities/uuid.js'

export class User {
  private readonly props: User.Props

  constructor(params: User.Params) {
    this.props = {
      ...params,
      id: new UUID(params.id),
      img: params.img ?? '',
      createdAt: params.createdAt ?? new Date(),
      updatedAt: params.createdAt ?? new Date(),
    }
  }

  get id(): string {
    return this.props.id.value
  }

  get img(): string {
    return this.props.img
  }

  get name(): string {
    return this.props.name
  }

  get email(): string {
    return this.props.email
  }

  get password(): string {
    return this.props.password
  }

  set password(password: string) {
    this.props.password = password
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
    img: string
    name: string
    email: string
    password: string
    createdAt: Date
    updatedAt: Date
  }

  export interface Params {
    id?: string
    img?: string
    name: string
    email: string
    password: string
    createdAt?: Date
    updatedAt?: Date
  }

  export interface Sample {
    id: string
    img: string
    name: string
  }
}
