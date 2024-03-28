import { User } from '#domain/entities/user-entity.js'
import { ICreateUser } from '#domain/usecases/user/create-user.js'
import { IEncrypter } from '#services/protocols/data/encrypter.js'
import { IHashGenerator } from '#services/protocols/data/hasher.js'
import {
  ICreateUserRepository,
  IFindUserByIdRepository,
} from '#services/protocols/database/user-repository.js'
import { BadRequestException, Injectable } from '@nestjs/common'
import { randomUUID } from 'node:crypto'

@Injectable()
export class CreateSteamUserService implements ICreateUser {
  constructor(
    private readonly findUserByIdRepository: IFindUserByIdRepository,
    private readonly encrypter: IEncrypter,
    private readonly hashGenerator: IHashGenerator,
    private readonly createUserRepository: ICreateUserRepository
  ) {}

  async create(data: User.Params): Promise<ICreateUser.Result> {
    if (!data.steamId) {
      throw new BadRequestException('steamId não encontrado')
    }

    const exists = await this.findUserByIdRepository.findById(data.steamId)
    const user = exists ?? new User(data)

    if (!exists) {
      user.password = await this.hashGenerator.generate(randomUUID())
      await this.createUserRepository.create(user)
    }

    const token = await this.encrypter.encrypt(user.id)

    return { user, token }
  }
}
