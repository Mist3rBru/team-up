import { TeamMapper } from '#domain/mappers/team-mapper.js'
import { IListUserTeams } from '#domain/usecases/user/list-user-teams.js'
import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common'

@Controller()
export class ListUserTeamsController {
  constructor(private readonly listUserTeamsService: IListUserTeams) {}

  @Get('/users/:userId/teams')
  async handle(
    @Param('userId', ParseUUIDPipe) userId: string
  ): Promise<ReturnType<TeamMapper['toHttp']>[]> {
    const data = await this.listUserTeamsService.listTeams(userId)

    return data.map(d => new TeamMapper(d).toHttp())
  }
}
