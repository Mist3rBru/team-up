import { Game } from '#domain/entities/game-entity.js'
import { User } from '#domain/entities/user-entity.js'
import {
  IFetchUser,
  IFetchUserGames,
} from '#services/protocols/data/fetcher.js'
import { Injectable, InternalServerErrorException } from '@nestjs/common'
import type SteamApi from 'steamapi'

@Injectable()
export class SteamAdapter implements IFetchUser, IFetchUserGames {
  private api: SteamApi

  constructor(apiKey: string) {
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

  async fetchGames(userId: string): Promise<Game[]> {
    const [games, ownedGames] = await Promise.all([
      this.api.getAppList(),
      this.api.getUserOwnedGames(userId),
    ])

    return ownedGames
      .map(ownedGame => {
        const game = games.find(_game => _game.appid === ownedGame.game.id)

        return (
          game &&
          new Game({
            img:
              ownedGame.game.headerURL ||
              ownedGame.game.headerMediumURL ||
              ownedGame.game.backgroundURL ||
              `https://cdn.cloudflare.steamstatic.com/steam/apps/${ownedGame.game.id}/header.jpg`,
            name: game.name,
          })
        )
      })
      .filter(Boolean)
  }
}
