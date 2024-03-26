import { IUpdateJoinTeamRequest } from '#domain/usecases/team/update-join-team-request.js'
import { Token } from '#presentation/decorators/token.decorator.js'
import { Body, Controller, Put } from '@nestjs/common'
import { IsNotEmpty, IsUUID } from 'class-validator'

class UpdateJoinTeamRequestDto {
  @IsUUID()
  requestId: string

  @IsNotEmpty()
  status: string
}

@Controller()
export class UpdateJoinTeamRequestController {
  constructor(
    private readonly updateJoinTeamRequestService: IUpdateJoinTeamRequest
  ) {}

  @Put('/teams/request')
  async handle(
    @Body() body: UpdateJoinTeamRequestDto,
    @Token() token: string
  ): Promise<{ message: string }> {
    await this.updateJoinTeamRequestService.update({
      requestId: body.requestId,
      token,
      status: body.status,
    })

    return {
      message: 'Pedido atualizado',
    }
  }
}
