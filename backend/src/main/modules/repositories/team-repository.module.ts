import {
  ICreateJoinTeamRequestRepository,
  ICreateTeamMemberRepository,
  ICreateTeamRepository,
  IFindJoinTeamRequestByIdRepository,
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
      provide: ICreateTeamRepository,
      useClass: TeamRepository,
    },
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
      provide: IFindJoinTeamRequestByIdRepository,
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
    ICreateTeamRepository,
    IFindTeamByIdRepository,
    ICreateTeamMemberRepository,
    IUpdateTeamMemberRepository,
    ICreateJoinTeamRequestRepository,
    IUpdateJoinTeamRequestRepository,
    IFindJoinTeamRequestByIdRepository,
  ],
})
export class TeamRepositoryModule {}
