import type { IUpdateJoinTeamRequest } from '#domain/usecases/team/update-join-team-request.js'
import { IFindUserByToken } from '#domain/usecases/user/find-user-by-token.js'
import { IUpdateJoinTeamRequestRepository } from '#services/protocols/database/team-repository.js'
import { IFindJoinTeamRequestByIdRepository } from '#services/protocols/database/team-repository.js'
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'

@Injectable()
export class UpdateJoinTeamRequestService implements IUpdateJoinTeamRequest {
  constructor(
    private readonly findJoinTeamRequestByIdRepository: IFindJoinTeamRequestByIdRepository,
    private readonly findUserByToken: IFindUserByToken,
    private readonly updateJoinTeamRequestRepository: IUpdateJoinTeamRequestRepository
  ) {}

  async update(data: IUpdateJoinTeamRequest.Params): Promise<void> {
    const { requestId, status, token } = data

    const request =
      await this.findJoinTeamRequestByIdRepository.findRequestById(requestId)

    if (!request) {
      throw new NotFoundException('solicitação não encontrada')
    }

    if (!request.team) {
      throw new InternalServerErrorException('time não encontrado')
    }

    if (!request.team.members) {
      throw new InternalServerErrorException('membros do time não encontrado')
    }

    const user = await this.findUserByToken.find({ token })
    const member = request.team.members.find(_member => _member.id === user.id)

    if (!member?.isModerator) {
      throw new UnauthorizedException(
        'apenas moderadores podem alterar solicitações'
      )
    }

    request.status = status
    await this.updateJoinTeamRequestRepository.updateRequest(request)
  }
}
