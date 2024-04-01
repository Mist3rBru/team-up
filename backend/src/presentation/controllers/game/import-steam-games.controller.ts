import { IImportGames } from '#domain/usecases/game/import-games.js'
import { Token } from '#presentation/decorators/token.decorator.js'
import { created } from '#presentation/utils/http-response.js'
import type { HttpResponse } from '#presentation/utils/http-response.js'
import { Controller, Inject, Post } from '@nestjs/common'

@Controller()
export class ImportSteamGamesController {
  constructor(
    @Inject('IImportSteamGames')
    private readonly importSteamGamesService: IImportGames
  ) {}

  @Post('/games/import/steam')
  async handle(@Token() token: string): Promise<HttpResponse> {
    await this.importSteamGamesService.import({ token })

    return created('Jogos importados com sucesso')
  }
}
