import { TeamMapper } from '#domain/mappers/team-mapper.js'
import { IListGameTeams } from '#domain/usecases/game/list-game-teams.js'
import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common'

@Controller()
export class ListGameTeamsController {
  constructor(private readonly listGameTeamsService: IListGameTeams) {}

  @Get('/games/:gameId/teams')
  async handle(
    @Param('gameId', ParseUUIDPipe) gameId: string
  ): Promise<ReturnType<TeamMapper['toHttp']>[]> {
    const data = await this.listGameTeamsService.listTeams(gameId)

    return data.map(d => new TeamMapper(d).toHttp())
  }
}
