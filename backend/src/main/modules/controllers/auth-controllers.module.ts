import { SteamLoginController } from '#presentation/controllers/auth/steam-login.controller.js'
import { CreateSteamUserService } from '#services/usecases/user/create-steam-user.service.js'
import { UserRepositoryModule } from '#main/modules/repositories/user-repository.module.js'
import { AuthenticationServicesModule } from '#main/modules/services/authentication-services.module.js'
import { Module } from '@nestjs/common'

@Module({
  imports: [UserRepositoryModule, AuthenticationServicesModule],
  controllers: [SteamLoginController],
  providers: [
    {
      provide: 'ICreateSteamUser',
      useClass: CreateSteamUserService,
    },
  ],
})
export class AuthControllersModule {}
