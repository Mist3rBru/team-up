import { User } from '#domain/entities/user-entity.js'
import { IFindUserById } from '#domain/usecases/user/find-user-by-id.js'
import { IFetchUser } from '#services/protocols/data/fetcher.js'
import { Inject, Injectable, NotFoundException } from '@nestjs/common'

@Injectable()
export class FindSteamUserByIdService implements IFindUserById {
  constructor(
    @Inject('IFetchSteamUser')
    private readonly fetchSteamUserById: IFetchUser
  ) {}

  async findById(userId: string): Promise<User> {
    const user = await this.fetchSteamUserById.fetchUser(userId)

    if (!user) {
      throw new NotFoundException('conta steam não encontrada')
    }

    return user
  }
}
