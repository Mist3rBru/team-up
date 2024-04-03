import { User } from '#domain/entities/user-entity.js'
import { IFindUserByToken } from '#domain/usecases/user/find-user-by-token.js'
import { IUpdateUserSteam } from '#domain/usecases/user/update-user-steam.js'
import { IUpdateUserRepository } from '#services/protocols/database/user-repository.js'
import { Injectable } from '@nestjs/common'

@Injectable()
export class UpdateUserSteamService implements IUpdateUserSteam {
  constructor(
    private readonly findUserByToken: IFindUserByToken,
    private readonly updateUserRepository: IUpdateUserRepository
  ) {}

  async update(data: IUpdateUserSteam.Params): Promise<User> {
    const { steamId, token } = data

    const user = await this.findUserByToken.find({ token })

    if (user.steamId !== steamId) {
      user.steamId = steamId
      await this.updateUserRepository.update(user)
    }

    return user
  }
}
