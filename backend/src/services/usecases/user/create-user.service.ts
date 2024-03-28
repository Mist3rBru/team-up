import { User } from '#domain/entities/user-entity.js'
import type { ICreateUser } from '#domain/usecases/user/create-user.js'
import { IEncrypter } from '#services/protocols/data/encrypter.js'
import { IHashGenerator } from '#services/protocols/data/hasher.js'
import { IFindUserByEmailRepository } from '#services/protocols/database/user-repository.js'
import { ICreateUserRepository } from '#services/protocols/database/user-repository.js'
import { BadRequestException, Injectable } from '@nestjs/common'

@Injectable()
export class CreateUserService implements ICreateUser {
  constructor(
    private readonly findUserByEmailRepository: IFindUserByEmailRepository,
    private readonly createUserRepository: ICreateUserRepository,
    private readonly hashGenerator: IHashGenerator,
    private readonly encrypter: IEncrypter
  ) {}

  async create(data: ICreateUser.Params): Promise<ICreateUser.Result> {
    if (!data.email) {
      throw new BadRequestException('email não encontrado')
    }

    const exists = await this.findUserByEmailRepository.findByEmail(data.email)

    if (exists) {
      throw new BadRequestException('email já cadastrado')
    }

    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    if (!data.password || data.password.length < 8) {
      throw new BadRequestException('a senha deve ter no mínimo 8 carácteres')
    }

    if (data.password !== data.confirmPassword) {
      throw new BadRequestException('ambas as senhas devem ser iguais')
    }

    const user = new User(data)
    user.password = await this.hashGenerator.generate(user.password)

    await this.createUserRepository.create(user)

    const token = await this.encrypter.encrypt({ id: user.id })

    return {
      user,
      token,
    }
  }
}
