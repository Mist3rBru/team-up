import { User } from '#domain/entities/user-entity.js'
import { IFindUserByToken } from '#domain/usecases/user/find-user-by-token.js'
import { IUpdateUser } from '#domain/usecases/user/update-user.js'
import { IUpdateUserRepository } from '#services/protocols/database/user-repository.js'
import {
  IFindUserByEmailRepository,
  IFindUserByNameRepository,
} from '#services/protocols/database/user-repository.js'
import { BadRequestException, Injectable } from '@nestjs/common'

@Injectable()
export class UpdateUserService implements IUpdateUser {
  constructor(
    private readonly findUserByToken: IFindUserByToken,
    private readonly findUserByNameRepository: IFindUserByNameRepository,
    private readonly findUserByEmailRepository: IFindUserByEmailRepository,
    private readonly updateUserRepository: IUpdateUserRepository
  ) {}

  async update(params: IUpdateUser.Params): Promise<IUpdateUser.Result> {
    const { data, token } = params
    const user = await this.findUserByToken.find({ token })

    if (user.email !== data.email) {
      const emailExists = await this.findUserByEmailRepository.findByEmail(
        data.email
      )

      if (emailExists) {
        throw new BadRequestException('email já cadastrado')
      }

      user.email = data.email
    }

    if (user.name !== data.name) {
      const nameExists = await this.findUserByNameRepository.findByName(
        User.formatName(data.name)
      )

      if (nameExists) {
        throw new BadRequestException('nome de identificação já cadastrado')
      }

      user.name = data.name
    }

    user.displayName = data.displayName
    await this.updateUserRepository.update(user)

    return user
  }
}
