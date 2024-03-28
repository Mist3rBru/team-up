import { Game } from '#domain/entities/game-entity.js'
import { IImportGames } from '#domain/usecases/game/import-games.js'
import { IFetchBuilder } from '#services/protocols/data/fetch-builder.js'
import { IUpsertGameRepository } from '#services/protocols/database/game-repository.js'
import { IUpsertUserGameRepository } from '#services/protocols/database/game-repository.js'
import { IFindPlatformByNameRepository } from '#services/protocols/database/platform-repository.js'
import { IFindUserByIdRepository } from '#services/protocols/database/user-repository.js'
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common'

@Injectable()
export class ImportSteamGamesService implements IImportGames {
  constructor(
    private readonly findUserByIdRepository: IFindUserByIdRepository,
    private readonly findPlatformByNameRepository: IFindPlatformByNameRepository,
    private readonly fetchBuilder: IFetchBuilder,
    private readonly upsertGameRepository: IUpsertGameRepository,
    private readonly upsertUserGameRepository: IUpsertUserGameRepository
  ) {}

  async import(data: IImportGames.Params): Promise<void> {
    const { userId } = data

    const user = await this.findUserByIdRepository.findById(userId)

    if (!user) {
      throw new NotFoundException('Usuário não encontrado')
    }

    if (!user.steamId) {
      throw new NotFoundException('Conta steam não cadastrada')
    }

    const platform = await this.findPlatformByNameRepository.findByName('Steam')

    if (!platform) {
      throw new NotFoundException('Plataforma não encontrada')
    }

    try {
      const [remoteGames, remoteOwnedGames] = await Promise.all([
        this.getRemoteGames(),
        this.getRemoteOwnedGames(user.steamId),
      ])

      const ownedGames = remoteOwnedGames
        .map(ownedGame => {
          const game = remoteGames.find(
            _game => _game.appid === ownedGame.appid
          )

          return (
            game &&
            new Game({
              img: `https://cdn.cloudflare.steamstatic.com/steam/apps/${game.appid}/header.jpg`,
              name: game.name,
            })
          )
        })
        .filter(Boolean)

      await Promise.all(
        ownedGames.map(async ownedGame => {
          const game = await this.upsertGameRepository.upsert(ownedGame, [
            platform.id,
          ])
          await this.upsertUserGameRepository.upsertUser(game, user)
        })
      )
    } catch (error) {
      console.error(error)

      throw new InternalServerErrorException('failed to import games')
    }
  }

  async getRemoteOwnedGames(steamId: string): Promise<{ appid: string }[]> {
    const {
      response: { games: ownedGamesWithIds },
    } = await this.fetchBuilder
      .url('http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001')
      .params({
        key: process.env.STEAM_SECRET,
        steamId,
        format: 'json',
      })
      .fetch<{
        response: {
          games: {
            appid: string
          }[]
        }
      }>()

    return ownedGamesWithIds
  }

  async getRemoteGames(): Promise<{ appid: string; name: string }[]> {
    const {
      applist: { apps },
    } = await this.fetchBuilder
      .url('http://api.steampowered.com/ISteamApps/GetAppList/v2')
      .fetch<{
        applist: {
          apps: {
            appid: string
            name: string
          }[]
        }
      }>()

    return apps
  }
}
