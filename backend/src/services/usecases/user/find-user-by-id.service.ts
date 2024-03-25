import type { User } from '#domain/entities/user-entity.js'
import type { IFindUserById } from '#domain/usecases/user/find-user-by-id.js'
import { IFindUserByIdRepository } from '#services/protocols/database/user-repository.js'
import { Injectable, NotFoundException } from '@nestjs/common'

@Injectable()
export class FindUserByIdService implements IFindUserById {
  constructor(
    private readonly findUserByIdRepository: IFindUserByIdRepository
  ) {}

  async findById(userId: string): Promise<User> {
    const user = await this.findUserByIdRepository.findById(userId)

    if (!user) {
      throw new NotFoundException('usuário não encontrado')
    }

    return user
  }
}
