import { User } from '#domain/entities/user-entity.js'
import { IFindUserByToken } from '#domain/usecases/user/find-user-by-token.js'
import { IUpdateUserPassword } from '#domain/usecases/user/update-user-password.js'
import { IHashGenerator } from '#services/protocols/data/hasher.js'
import { IUpdateUserRepository } from '#services/protocols/database/user-repository.js'
import { BadRequestException, Injectable } from '@nestjs/common'

@Injectable()
export class UpdateUserPasswordService implements IUpdateUserPassword {
  constructor(
    private readonly findUserByToken: IFindUserByToken,
    private readonly hashGenerator: IHashGenerator,
    private readonly updateUserRepository: IUpdateUserRepository
  ) {}

  async update(params: IUpdateUserPassword.Params): Promise<void> {
    const {
      data: { password, confirmPassword },
      token,
    } = params

    if (!password || password.length < User.MIN_PASSWORD_LENGTH) {
      throw new BadRequestException(
        `a senha deve ter no mínimo ${User.MIN_PASSWORD_LENGTH} carácteres`
      )
    }

    // eslint-disable-next-line security/detect-possible-timing-attacks
    if (password !== confirmPassword) {
      throw new BadRequestException('ambas senhas devem ser iguais')
    }

    const user = await this.findUserByToken.find({ token })

    user.password = await this.hashGenerator.generate(password)
    await this.updateUserRepository.update(user)
  }
}
