import { Team } from '#domain/entities/team-entity.js'
import type { ICreateTeam } from '#domain/usecases/team/create-team.js'
import { ICreateTeamRepository } from '#services/protocols/database/team-repository.js'
import { Injectable } from '@nestjs/common'

@Injectable()
export class CreateTeamService implements ICreateTeam {
  constructor(private readonly createTeamRepository: ICreateTeamRepository) {}

  async create(data: ICreateTeam.Params): Promise<Team> {
    const { members, ...teamParams } = data

    const team = new Team(teamParams)
    await this.createTeamRepository.create(team, members)

    return team
  }
}
