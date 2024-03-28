import { IRequestJoinTeam } from '#domain/usecases/team/request-join-team.js'
import { created } from '#presentation/utils/http-response.js'
import type { HttpResponse } from '#presentation/utils/http-response.js'
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
  async handle(@Body() body: RequestJoinTeamDto): Promise<HttpResponse> {
    await this.requestJoinTeamService.request(body)

    return created('Solicitação enviada')
  }
}
