import { TeamMapper } from '#domain/mappers/team-mapper.js'
import { IFindTeamById } from '#domain/usecases/team/find-team-by-id.js'
import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common'

@Controller()
export class FindTeamByIdController {
  constructor(private readonly findTeamByIdService: IFindTeamById) {}

  @Get('/teams/:teamId')
  async handle(
    @Param('teamId', ParseUUIDPipe) teamId: string
  ): Promise<ReturnType<TeamMapper['toHttp']>> {
    const team = await this.findTeamByIdService.findById(teamId)

    return new TeamMapper(team).toHttp()
  }
}
