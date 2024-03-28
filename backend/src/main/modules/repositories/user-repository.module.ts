import {
  ICreateUserRepository,
  IFindUserByEmailRepository,
  IFindUserByIdRepository,
  IFindUserByNameRepository,
  IUpdateUserRepository,
} from '#services/protocols/database/user-repository.js'
import { PrismaService } from '#infra/database/postgres/prisma.service.js'
import { UserRepository } from '#infra/database/postgres/user-repository.service.js'
import { Module } from '@nestjs/common'

@Module({
  providers: [
    PrismaService,
    { provide: ICreateUserRepository, useClass: UserRepository },
    { provide: IUpdateUserRepository, useClass: UserRepository },
    { provide: IFindUserByIdRepository, useClass: UserRepository },
    { provide: IFindUserByEmailRepository, useClass: UserRepository },
    { provide: IFindUserByNameRepository, useClass: UserRepository },
  ],
  exports: [
    ICreateUserRepository,
    IUpdateUserRepository,
    IFindUserByIdRepository,
    IFindUserByEmailRepository,
    IFindUserByNameRepository,
  ],
})
export class UserRepositoryModule {}
