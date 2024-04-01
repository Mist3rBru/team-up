import { GameMapper } from '#domain/mappers/game-mapper.js'
import { IFindGameById } from '#domain/usecases/game/find-game-by-id.js'
import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common'

@Controller()
export class FindGameByIdController {
  constructor(private readonly findGameByIdService: IFindGameById) {}

  @Get('/games/:gameId')
  async handle(
    @Param('gameId', ParseUUIDPipe) gameId: string
  ): Promise<ReturnType<GameMapper['toHttp']>> {
    const game = await this.findGameByIdService.findById(gameId)

    return new GameMapper(game).toHttp()
  }
}
