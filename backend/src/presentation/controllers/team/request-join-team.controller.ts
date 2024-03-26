import { IRequestJoinTeam } from '#domain/usecases/team/request-join-team.js'
import { Body, Controller, Post } from '@nestjs/common'
import { IsUUID } from 'class-validator'

class RequestJoinTeamDto {
  @IsUUID()
  teamId: string

  @IsUUID()
  userId: string
}

@Controller()
export class RequestJoinTeamController {
  constructor(private readonly requestJoinTeamService: IRequestJoinTeam) {}

  @Post('/teams/request')
  async handle(@Body() body: RequestJoinTeamDto): Promise<{ message: string }> {
    await this.requestJoinTeamService.request(body)

    return {
      message: 'Solicitação enviada',
    }
  }
}
