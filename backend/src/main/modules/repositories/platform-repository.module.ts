import {
  ICreatePlatformRepository,
  IFindPlatformByIdRepository,
  IFindPlatformByNameRepository,
  IListPlatformsRepository,
} from '#services/protocols/database/platform-repository.js'
import { PlatformRepository } from '#infra/database/postgres/platform-repository.service.js'
import { PrismaService } from '#infra/database/postgres/prisma.service.js'
import { Module } from '@nestjs/common'

@Module({
  providers: [
    PrismaService,
    {
      provide: ICreatePlatformRepository,
      useClass: PlatformRepository,
    },
    {
      provide: IListPlatformsRepository,
      useClass: PlatformRepository,
    },
    {
      provide: IFindPlatformByIdRepository,
      useClass: PlatformRepository,
    },
    {
      provide: IFindPlatformByNameRepository,
      useClass: PlatformRepository,
    },
  ],
  exports: [
    ICreatePlatformRepository,
    IFindPlatformByIdRepository,
    IFindPlatformByNameRepository,
    IListPlatformsRepository,
  ],
})
export class PlatformRepositoryModule {}
