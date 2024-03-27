import { IImportGames } from '#domain/usecases/game/import-games.js'
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
  ): Promise<{ message: string }> {
    await this.importSteamGamesService.import({ userId })

    return {
      message: 'Jogos importados com sucesso',
    }
  }
}
