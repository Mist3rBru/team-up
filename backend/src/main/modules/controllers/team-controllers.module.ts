import { ICreateTeam } from '#domain/usecases/team/create-team.js'
import { IFindTeamById } from '#domain/usecases/team/find-team-by-id.js'
import { IJoinTeam } from '#domain/usecases/team/join-team.js'
import { IRequestJoinTeam } from '#domain/usecases/team/request-join-team.js'
import { IUpdateJoinTeamRequest } from '#domain/usecases/team/update-join-team-request.js'
import { CreateTeamController } from '#presentation/controllers/team/create-team.controller.js'
import { FindTeamByIdController } from '#presentation/controllers/team/find-team-by-id.controller.js'
import { JoinTeamController } from '#presentation/controllers/team/join-team.controller.js'
import { RequestJoinTeamController } from '#presentation/controllers/team/request-join-team.controller.js'
import { UpdateJoinTeamRequestController } from '#presentation/controllers/team/update-join-team-request.controller.js'
import { CreateTeamService } from '#services/usecases/team/create-team.service.js'
import { FindTeamByIdService } from '#services/usecases/team/find-team-by-id.service.js'
import { JoinTeamService } from '#services/usecases/team/join-team.service.js'
import { RequestJoinTeamService } from '#services/usecases/team/request-join-team.service.js'
import { UpdateJoinTeamRequestService } from '#services/usecases/team/update-join-team-request.service.js'
import { PrismaService } from '#infra/database/postgres/prisma.service.js'
import { TeamRepositoryModule } from '#main/modules/repositories/team-repository.module.js'
import { UserRepositoryModule } from '#main/modules/repositories/user-repository.module.js'
import { AuthenticationServicesModule } from '#main/modules/services/authentication-services.module.js'
import { Module } from '@nestjs/common'

@Module({
  imports: [
    TeamRepositoryModule,
    UserRepositoryModule,
    AuthenticationServicesModule,
  ],
  controllers: [
    CreateTeamController,
    FindTeamByIdController,
    JoinTeamController,
    RequestJoinTeamController,
    UpdateJoinTeamRequestController,
  ],
  providers: [
    PrismaService,

    {
      provide: ICreateTeam,
      useClass: CreateTeamService,
    },
    {
      provide: IFindTeamById,
      useClass: FindTeamByIdService,
    },
    {
      provide: IJoinTeam,
      useClass: JoinTeamService,
    },
    {
      provide: IRequestJoinTeam,
      useClass: RequestJoinTeamService,
    },
    {
      provide: IUpdateJoinTeamRequest,
      useClass: UpdateJoinTeamRequestService,
    },
  ],
})
export class TeamControllersModule {}
