import {
  ICreatePlatformRepository,
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
  ],
  exports: [ICreatePlatformRepository, IListPlatformsRepository],
})
export class PlatformRepositoryModule {}
