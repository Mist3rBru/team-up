import { Team } from '#domain/entities/team-entity.js'
import { IFindTeamById } from '#domain/usecases/team/find-team-by-id.js'
import { IFindTeamByIdRepository } from '#services/protocols/database/team-repository.js'
import { BadRequestException, Injectable } from '@nestjs/common'

@Injectable()
export class FindTeamByIdService implements IFindTeamById {
  constructor(
    private readonly findTeamByIdRepository: IFindTeamByIdRepository
  ) {}

  async findById(teamId: string): Promise<Team> {
    const team = await this.findTeamByIdRepository.findById(teamId)

    if (!team) {
      throw new BadRequestException('time não encontrado')
    }

    return team
  }
}
