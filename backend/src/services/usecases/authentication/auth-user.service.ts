import { IAuthUser } from '#domain/usecases/authentication/auth-user.js'
import { IEncrypter } from '#services/protocols/data/encrypter.js'
import { IHashComparator } from '#services/protocols/data/hasher.js'
import { IFindUserByNameRepository } from '#services/protocols/database/user-repository.js'
import { BadRequestException, Injectable } from '@nestjs/common'

@Injectable()
export class AuthUserService implements IAuthUser {
  constructor(
    private readonly findUserByNameRepository: IFindUserByNameRepository,
    private readonly hashComparator: IHashComparator,
    private readonly encrypter: IEncrypter
  ) {}

  readonly errorMessage = 'nome e/ou senha inválidos'

  async auth(data: IAuthUser.Params): Promise<IAuthUser.Result> {
    if (!data.name || !data.password) {
      throw new BadRequestException(this.errorMessage)
    }

    const user = await this.findUserByNameRepository.findByName(data.name)

    if (!user) {
      throw new BadRequestException(this.errorMessage)
    }

    const isPassword = await this.hashComparator.compare(
      data.password,
      user.password
    )

    if (!isPassword) {
      throw new BadRequestException(this.errorMessage)
    }

    const token = await this.encrypter.encrypt(user.id)

    return {
      user,
      token,
    }
  }
}
