import { User } from '#domain/entities/user-entity.js'
import type { ICreateUser } from '#domain/usecases/user/create-user.js'
import { IEncrypter } from '#services/protocols/data/encrypter.js'
import { IHashGenerator } from '#services/protocols/data/hasher.js'
import { IFindUserByNameRepository } from '#services/protocols/database/user-repository.js'
import { IFindUserByEmailRepository } from '#services/protocols/database/user-repository.js'
import { ICreateUserRepository } from '#services/protocols/database/user-repository.js'
import { BadRequestException, Injectable } from '@nestjs/common'

@Injectable()
export class CreateUserService implements ICreateUser {
  constructor(
    private readonly findUserByNameRepository: IFindUserByNameRepository,
    private readonly findUserByEmailRepository: IFindUserByEmailRepository,
    private readonly createUserRepository: ICreateUserRepository,
    private readonly hashGenerator: IHashGenerator,
    private readonly encrypter: IEncrypter
  ) {}

  async create(data: ICreateUser.Params): Promise<ICreateUser.Result> {
    if (!data.email) {
      throw new BadRequestException('email não encontrado')
    }

    const emailExists = await this.findUserByEmailRepository.findByEmail(
      data.email
    )

    if (emailExists) {
      throw new BadRequestException('email já cadastrado')
    }

    const nameExists = await this.findUserByNameRepository.findByName(
      User.formatName(data.name)
    )

    if (nameExists) {
      throw new BadRequestException('nome de identificação já cadastrado')
    }

    if (!data.password || data.password.length < User.MIN_PASSWORD_LENGTH) {
      throw new BadRequestException(
        `a senha deve ter no mínimo ${User.MIN_PASSWORD_LENGTH} carácteres`
      )
    }

    if (data.password !== data.confirmPassword) {
      throw new BadRequestException('ambas as senhas devem ser iguais')
    }

    const user = new User(data)
    user.password = await this.hashGenerator.generate(user.password)

    await this.createUserRepository.create(user)

    const token = await this.encrypter.encrypt(user.id)

    return {
      user,
      token,
    }
  }
}
