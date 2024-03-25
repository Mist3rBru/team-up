import type { Team } from '#domain/entities/team-entity.js'
import type { IJoinTeam } from '#domain/usecases/team/join-team.js'
import { IFindTeamByIdRepository } from '#services/protocols/database/team-repository.js'
import { ICreateTeamMemberRepository } from '#services/protocols/database/team-repository.js'
import { IFindUserByIdRepository } from '#services/protocols/database/user-repository.js'
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common'

@Injectable()
export class JoinTeamService implements IJoinTeam {
  constructor(
    private readonly findTeamByIdRepository: IFindTeamByIdRepository,
    private readonly findUserByIdRepository: IFindUserByIdRepository,
    private readonly createTeamMember: ICreateTeamMemberRepository
  ) {}

  async join(data: IJoinTeam.Params): Promise<Team> {
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

    if (!team.isOpen) {
      throw new BadRequestException('abra uma solicitação para entrar no time')
    }

    const user = await this.findUserByIdRepository.findById(userId)

    if (!user) {
      throw new NotFoundException('usuário não encontrado')
    }

    await this.createTeamMember.createMember(team, user)
    team.members.push(user)

    return team
  }
}
