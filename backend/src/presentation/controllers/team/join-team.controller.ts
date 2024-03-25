import { IJoinTeam } from '#domain/usecases/team/join-team.js'
import { Body, Controller, Post } from '@nestjs/common'
import { IsUUID } from 'class-validator'

class JoinTeamDto {
  @IsUUID()
  teamId: string

  @IsUUID()
  userId: string
}

@Controller()
export class JoinTeamController {
  constructor(private readonly joinTeamService: IJoinTeam) {}

  @Post('/teams/join')
  async handle(@Body() body: JoinTeamDto): Promise<void> {
    await this.joinTeamService.join(body)
  }
}
