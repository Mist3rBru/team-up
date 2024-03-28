import { IAuthUser } from '#domain/usecases/authentication/auth-user.js'
import { LoginController } from '#presentation/controllers/auth/login.controller.js'
import { SteamLoginController } from '#presentation/controllers/auth/steam-login.controller.js'
import { AuthUserService } from '#services/usecases/authentication/auth-user.service.js'
import { CreateSteamUserService } from '#services/usecases/user/create-steam-user.service.js'
import { UserRepositoryModule } from '#main/modules/repositories/user-repository.module.js'
import { AuthenticationServicesModule } from '#main/modules/services/authentication-services.module.js'
import { Module } from '@nestjs/common'

@Module({
  imports: [UserRepositoryModule, AuthenticationServicesModule],
  controllers: [LoginController, SteamLoginController],
  providers: [
    {
      provide: IAuthUser,
      useClass: AuthUserService,
    },
    {
      provide: 'ICreateSteamUser',
      useClass: CreateSteamUserService,
    },
  ],
})
export class AuthControllersModule {}
