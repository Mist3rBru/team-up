import { IImportGames } from '#domain/usecases/game/import-games.js'
import { created } from '#presentation/utils/http-response.js'
import type { HttpResponse } from '#presentation/utils/http-response.js'
import { Controller, Inject, Param, ParseUUIDPipe, Post } from '@nestjs/common'

@Controller()
export class ImportSteamGamesController {
  constructor(
    @Inject('IImportSteamGames')
    private readonly importSteamGamesService: IImportGames
  ) {}

  @Post('/games/import/steam/:userId')
  async handle(
    @Param('userId', ParseUUIDPipe) userId: string
  ): Promise<HttpResponse> {
    await this.importSteamGamesService.import({ userId })

    return created('Jogos importados com sucesso')
  }
}
