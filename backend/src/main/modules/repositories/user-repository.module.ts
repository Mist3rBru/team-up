import {
  ICreateUserRepository,
  IFindUserByEmailRepository,
} from '#services/protocols/database/user-repository.js'
import { PrismaService } from '#infra/database/postgres/prisma.service.js'
import { UserRepository } from '#infra/database/postgres/user-repository.service.js'
import { Module } from '@nestjs/common'

@Module({
  providers: [
    PrismaService,
    { provide: ICreateUserRepository, useClass: UserRepository },
    { provide: IFindUserByEmailRepository, useClass: UserRepository },
  ],
  exports: [ICreateUserRepository, IFindUserByEmailRepository],
})
export class UserRepositoryModule {}
