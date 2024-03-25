import type { User } from '#domain/entities/user-entity.js'

export abstract class ICreateUserRepository {
  abstract create(data: User): Promise<void>
}

export abstract class IFindUserByEmailRepository {
  abstract findByEmail(email: string): Promise<User | null>
}
