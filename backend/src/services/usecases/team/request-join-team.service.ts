import { JoinTeamRequest } from '#domain/entities/join-team-request.js'
import type { IRequestJoinTeam } from '#domain/usecases/team/request-join-team.js'
import { IFindTeamByIdRepository } from '#services/protocols/database/team-repository.js'
import { ICreateJoinTeamRequestRepository } from '#services/protocols/database/team-repository.js'
import { IFindUserByIdRepository } from '#services/protocols/database/user-repository.js'
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common'

@Injectable()
export class RequestJoinTeamService implements IRequestJoinTeam {
  constructor(
    private readonly findTeamByIdRepository: IFindTeamByIdRepository,
    private readonly findUserByIdRepository: IFindUserByIdRepository,
    private readonly createJoinTeamRequestRepository: ICreateJoinTeamRequestRepository
  ) {}

  async request(data: IRequestJoinTeam.Params): Promise<void> {
    const { teamId, userId } = data

    const team = await this.findTeamByIdRepository.findById(teamId)

    if (!team) {
      throw new NotFoundException('time não encontrado')
    }

    if (!team.members) {
      throw new InternalServerErrorException('membros do time não encontrados')
    }

    const isMember = team.members.find(member => member.id === userId)

    if (isMember) {
      throw new BadRequestException('usuário já faz parte do time')
    }

    const user = await this.findUserByIdRepository.findById(userId)

    if (!user) {
      throw new NotFoundException('usuário não encontrado')
    }

    const joinTeamRequest = new JoinTeamRequest({
      teamId: team.id,
      userId: user.id,
    })
    await this.createJoinTeamRequestRepository.createRequest(joinTeamRequest)
  }
}
