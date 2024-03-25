import { ICreateUser } from '#domain/usecases/user/create-user.js'
import { CreateUserController } from '#presentation/controllers/user/create-user.controller.js'
import { IEncrypter } from '#services/protocols/data/encrypter.js'
import { IHashGenerator } from '#services/protocols/data/hasher.js'
import { CreateUserService } from '#services/usecases/user/create-user.service.js'
import { BcryptAdapter } from '#infra/adapters/bcrypt-adapter.js'
import { JwtAdapter } from '#infra/adapters/jwt-adapter.js'
import { UserRepositoryModule } from '#main/modules/repositories/user-repository.module.js'
import { Module } from '@nestjs/common'

@Module({
  imports: [UserRepositoryModule],
  controllers: [CreateUserController],
  providers: [
    { provide: IHashGenerator, useClass: BcryptAdapter },
    {
      provide: IEncrypter,
      useFactory: (): JwtAdapter =>
        new JwtAdapter({ secret: process.env.TOKEN_SECRET, expiresIn: '4h' }),
    },
    { provide: ICreateUser, useClass: CreateUserService },
  ],
})
export class UserControllerModule {}
