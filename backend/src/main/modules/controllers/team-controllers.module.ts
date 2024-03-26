import { IJoinTeam } from '#domain/usecases/team/join-team.js'
import { IRequestJoinTeam } from '#domain/usecases/team/request-join-team.js'
import { JoinTeamController } from '#presentation/controllers/team/join-team.controller.js'
import { RequestJoinTeamController } from '#presentation/controllers/team/request-join-team.controller.js'
import { JoinTeamService } from '#services/usecases/team/join-team.service.js'
import { RequestJoinTeamService } from '#services/usecases/team/request-join-team.service.js'
import { PrismaService } from '#infra/database/postgres/prisma.service.js'
import { TeamRepositoryModule } from '#main/modules/repositories/team-repository.module.js'
import { UserRepositoryModule } from '#main/modules/repositories/user-repository.module.js'
import { Module } from '@nestjs/common'

@Module({
  imports: [TeamRepositoryModule, UserRepositoryModule],
  controllers: [JoinTeamController, RequestJoinTeamController],
  providers: [
    PrismaService,
    {
      provide: IJoinTeam,
      useClass: JoinTeamService,
    },
    {
      provide: IRequestJoinTeam,
      useClass: RequestJoinTeamService,
    },
  ],
})
export class TeamControllersModule {}
