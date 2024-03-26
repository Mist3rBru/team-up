import { ICreateUser } from '#domain/usecases/user/create-user.js'
import { IFindUserById } from '#domain/usecases/user/find-user-by-id.js'
import { IFindUserByToken } from '#domain/usecases/user/find-user-by-token.js'
import { IListUserGames } from '#domain/usecases/user/list-user-games.js'
import { CreateUserController } from '#presentation/controllers/user/create-user.controller.js'
import { FindUserByIdController } from '#presentation/controllers/user/find-user-by-id.controller.js'
import { FindUserByTokenController } from '#presentation/controllers/user/find-user-by-token.controller.js'
import { ListUserGamesController } from '#presentation/controllers/user/list-user-games.controller.js'
import { CreateUserService } from '#services/usecases/user/create-user.service.js'
import { FindUserByIdService } from '#services/usecases/user/find-user-by-id.service.js'
import { FindUserByTokenService } from '#services/usecases/user/find-user-by-token.service.js'
import { PrismaService } from '#infra/database/postgres/prisma.service.js'
import { UserRepository } from '#infra/database/postgres/user-repository.service.js'
import { UserRepositoryModule } from '#main/modules/repositories/user-repository.module.js'
import { AuthenticationServicesModule } from '#main/modules/services/authentication-services.module.js'
import { Module } from '@nestjs/common'

@Module({
  imports: [UserRepositoryModule, AuthenticationServicesModule],
  controllers: [
    CreateUserController,
    FindUserByIdController,
    FindUserByTokenController,
    ListUserGamesController,
  ],
  providers: [
    PrismaService,
    { provide: ICreateUser, useClass: CreateUserService },
    { provide: IFindUserById, useClass: FindUserByIdService },
    { provide: IFindUserByToken, useClass: FindUserByTokenService },
    { provide: IListUserGames, useClass: UserRepository },
  ],
})
export class UserControllersModule {}
