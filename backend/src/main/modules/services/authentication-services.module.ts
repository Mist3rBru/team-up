import { IFindUserByToken } from '#domain/usecases/user/find-user-by-token.js'
import { IDecrypter, IEncrypter } from '#services/protocols/data/encrypter.js'
import {
  IHashComparator,
  IHashGenerator,
} from '#services/protocols/data/hasher.js'
import { FindUserByTokenService } from '#services/usecases/user/find-user-by-token.service.js'
import { BcryptAdapter } from '#infra/adapters/bcrypt-adapter.js'
import { JwtAdapter } from '#infra/adapters/jwt-adapter.js'
import { UserRepositoryModule } from '#main/modules/repositories/user-repository.module.js'
import { Module } from '@nestjs/common'

@Module({
  imports: [UserRepositoryModule],
  providers: [
    { provide: IHashGenerator, useClass: BcryptAdapter },
    { provide: IHashComparator, useClass: BcryptAdapter },
    {
      provide: IEncrypter,
      useFactory: (): JwtAdapter =>
        new JwtAdapter({ secret: process.env.TOKEN_SECRET, expiresIn: '4h' }),
    },
    {
      provide: IDecrypter,
      useFactory: (): JwtAdapter =>
        new JwtAdapter({ secret: process.env.TOKEN_SECRET, expiresIn: '4h' }),
    },
    {
      provide: IFindUserByToken,
      useClass: FindUserByTokenService,
    },
  ],
  exports: [
    IHashGenerator,
    IHashComparator,
    IEncrypter,
    IDecrypter,
    IFindUserByToken,
  ],
})
export class AuthenticationServicesModule {}
