import type { User } from '#domain/entities/user-entity.js'

export abstract class IFindUserById {
  abstract findById(userId: string): Promise<User>
}
