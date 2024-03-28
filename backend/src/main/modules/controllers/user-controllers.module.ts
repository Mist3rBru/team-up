import { ICreateUser } from '#domain/usecases/user/create-user.js'
import { IFindUserById } from '#domain/usecases/user/find-user-by-id.js'
import { IFindUserByToken } from '#domain/usecases/user/find-user-by-token.js'
import { IListUserGames } from '#domain/usecases/user/list-user-games.js'
import { IListUserPlatforms } from '#domain/usecases/user/list-user-platforms.js'
import { IListUserTeams } from '#domain/usecases/user/list-user-teams.js'
import { IUpdateUser } from '#domain/usecases/user/update-user.js'
import { CreateUserController } from '#presentation/controllers/user/create-user.controller.js'
import { FindUserByIdController } from '#presentation/controllers/user/find-user-by-id.controller.js'
import { FindUserByTokenController } from '#presentation/controllers/user/find-user-by-token.controller.js'
import { ListUserGamesController } from '#presentation/controllers/user/list-user-games.controller.js'
import { ListUserPlatformsController } from '#presentation/controllers/user/list-user-platforms.controller.js'
import { ListUserTeamsController } from '#presentation/controllers/user/list-user-teams.controller.js'
import { UpdateUserController } from '#presentation/controllers/user/update-user.controller.js'
import { CreateUserService } from '#services/usecases/user/create-user.service.js'
import { FindUserByIdService } from '#services/usecases/user/find-user-by-id.service.js'
import { FindUserByTokenService } from '#services/usecases/user/find-user-by-token.service.js'
import { UpdateUserService } from '#services/usecases/user/update-user.service.js'
import { PrismaService } from '#infra/database/postgres/prisma.service.js'
import { UserRepository } from '#infra/database/postgres/user-repository.service.js'
import { UserRepositoryModule } from '#main/modules/repositories/user-repository.module.js'
import { AuthenticationServicesModule } from '#main/modules/services/authentication-services.module.js'
import { Module } from '@nestjs/common'

@Module({
  imports: [UserRepositoryModule, AuthenticationServicesModule],
  controllers: [
    CreateUserController,
    UpdateUserController,
    FindUserByIdController,
    FindUserByTokenController,
    ListUserGamesController,
    ListUserPlatformsController,
    ListUserTeamsController,
  ],
  providers: [
    PrismaService,
    { provide: ICreateUser, useClass: CreateUserService },
    { provide: IUpdateUser, useClass: UpdateUserService },
    { provide: IFindUserById, useClass: FindUserByIdService },
    { provide: IFindUserByToken, useClass: FindUserByTokenService },
    { provide: IListUserGames, useClass: UserRepository },
    { provide: IListUserPlatforms, useClass: UserRepository },
    { provide: IListUserTeams, useClass: UserRepository },
  ],
})
export class UserControllersModule {}
