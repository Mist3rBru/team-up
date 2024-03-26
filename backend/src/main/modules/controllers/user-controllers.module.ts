import { ICreateUser } from '#domain/usecases/user/create-user.js'
import { IFindUserById } from '#domain/usecases/user/find-user-by-id.js'
import { IFindUserByToken } from '#domain/usecases/user/find-user-by-token.js'
import { CreateUserController } from '#presentation/controllers/user/create-user.controller.js'
import { FindUserByIdController } from '#presentation/controllers/user/find-user-by-id.controller.js'
import { FindUserByTokenController } from '#presentation/controllers/user/find-user-by-token.controller.js'
import { CreateUserService } from '#services/usecases/user/create-user.service.js'
import { FindUserByIdService } from '#services/usecases/user/find-user-by-id.service.js'
import { FindUserByTokenService } from '#services/usecases/user/find-user-by-token.service.js'
import { UserRepositoryModule } from '#main/modules/repositories/user-repository.module.js'
import { AuthenticationServicesModule } from '#main/modules/services/authentication-services.module.js'
import { Module } from '@nestjs/common'

@Module({
  imports: [UserRepositoryModule, AuthenticationServicesModule],
  controllers: [
    CreateUserController,
    FindUserByIdController,
    FindUserByTokenController,
  ],
  providers: [
    { provide: ICreateUser, useClass: CreateUserService },
    { provide: IFindUserById, useClass: FindUserByIdService },
    { provide: IFindUserByToken, useClass: FindUserByTokenService },
  ],
})
export class UserControllersModule {}
