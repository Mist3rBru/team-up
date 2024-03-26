import {
  ICreateJoinTeamRequestRepository,
  ICreateTeamMemberRepository,
  IFindTeamByIdRepository,
  IUpdateJoinTeamRequestRepository,
  IUpdateTeamMemberRepository,
} from '#services/protocols/database/team-repository.js'
import { PrismaService } from '#infra/database/postgres/prisma.service.js'
import { TeamRepository } from '#infra/database/postgres/team-repository.service.js'
import { Module } from '@nestjs/common'

@Module({
  providers: [
    PrismaService,
    {
      provide: IFindTeamByIdRepository,
      useClass: TeamRepository,
    },
    {
      provide: ICreateTeamMemberRepository,
      useClass: TeamRepository,
    },
    {
      provide: IUpdateTeamMemberRepository,
      useClass: TeamRepository,
    },
    {
      provide: ICreateJoinTeamRequestRepository,
      useClass: TeamRepository,
    },
    {
      provide: IUpdateJoinTeamRequestRepository,
      useClass: TeamRepository,
    },
  ],
  exports: [
    IFindTeamByIdRepository,
    ICreateTeamMemberRepository,
    IUpdateTeamMemberRepository,
    ICreateJoinTeamRequestRepository,
    IUpdateJoinTeamRequestRepository,
  ],
})
export class TeamRepositoryModule {}
