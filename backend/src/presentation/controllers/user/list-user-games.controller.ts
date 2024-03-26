import { GameMapper } from '#domain/mappers/game-mapper.js'
import { IListUserGames } from '#domain/usecases/user/list-user-games.js'
import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common'

@Controller()
export class ListUserGamesController {
  constructor(private readonly listUserGamesService: IListUserGames) {}

  @Get('/users/:userId/games')
  async handle(
    @Param('userId', ParseUUIDPipe) userId: string
  ): Promise<ReturnType<GameMapper['toHttp']>[]> {
    const data = await this.listUserGamesService.listGames(userId)

    return data.map(d => new GameMapper(d).toHttp())
  }
}
