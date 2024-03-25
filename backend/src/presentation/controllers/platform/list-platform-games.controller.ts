import { GameMapper } from '#domain/mappers/game-mapper.js'
import { IListPlatformGames } from '#domain/usecases/platform/list-platform-games.js'
import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common'

@Controller()
export class ListPlatformGamesController {
  constructor(private readonly listPlatformGamesService: IListPlatformGames) {}

  @Get('/platforms/:platformId/games')
  async handle(
    @Param('platformId', ParseUUIDPipe) platformId: string
  ): Promise<ReturnType<GameMapper['toHttp']>[]> {
    const games = await this.listPlatformGamesService.list(platformId)

    return games.map(game => new GameMapper(game).toHttp())
  }
}
