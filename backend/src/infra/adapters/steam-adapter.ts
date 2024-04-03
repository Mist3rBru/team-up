import { User } from '#domain/entities/user-entity.js'
import { IFetchUser } from '#services/protocols/data/fetcher.js'
import { Injectable, InternalServerErrorException } from '@nestjs/common'
import type SteamApi from 'steamapi'

@Injectable()
export class SteamAdapter implements IFetchUser {
  private api: SteamApi

  constructor(apiKey: string) {
    // eslint-disable-next-line security/detect-eval-with-expression
    ;(
      eval(`import('steamapi')`) as Promise<{
        default: new (key: string) => SteamApi
      }>
    )
      .then(SteamAPI => {
        this.api = new SteamAPI.default(apiKey)
      })
      .catch(error => {
        throw new InternalServerErrorException(error)
      })
  }

  async fetchUser(userId: string): Promise<User | null> {
    const summaries = await this.api.getUserSummary(userId)
    const summary = Array.isArray(summaries) ? summaries[0] : summaries

    if (!summary) {
      return null
    }

    return new User({
      steamId: summary.steamID,
      name: summary.nickname,
      displayName: summary.nickname,
      img: summary.avatar.large,
      password: '',
    })
  }
}
