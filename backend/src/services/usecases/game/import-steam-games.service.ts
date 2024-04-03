import { IImportGames } from '#domain/usecases/game/import-games.js'
import { IFindUserByToken } from '#domain/usecases/user/find-user-by-token.js'
import { IFetchUserGames } from '#services/protocols/data/fetcher.js'
import { IUpsertGameRepository } from '#services/protocols/database/game-repository.js'
import { IUpsertUserGameRepository } from '#services/protocols/database/game-repository.js'
import { IFindPlatformByNameRepository } from '#services/protocols/database/platform-repository.js'
import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common'

@Injectable()
export class ImportSteamGamesService implements IImportGames {
  constructor(
    private readonly findUserByTokenService: IFindUserByToken,
    private readonly findPlatformByNameRepository: IFindPlatformByNameRepository,
    @Inject('IFetchSteamUserGames')
    private readonly fetchUserGames: IFetchUserGames,
    private readonly upsertGameRepository: IUpsertGameRepository,
    private readonly upsertUserGameRepository: IUpsertUserGameRepository
  ) {}

  async import(data: IImportGames.Params): Promise<void> {
    const { token } = data

    const user = await this.findUserByTokenService.find({ token })

    if (!user.steamId) {
      throw new NotFoundException('Conta steam não cadastrada')
    }

    const platform = await this.findPlatformByNameRepository.findByName('Steam')

    if (!platform) {
      throw new NotFoundException('Plataforma não encontrada')
    }

    try {
      const ownedGames = await this.fetchUserGames.fetchGames(user.steamId)

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
}
