import { IListPlatformsRepository } from '#services/protocols/database/platform-repository.js'
import { PlatformRepository } from '#infra/database/postgres/platform-repository.service.js'
import { PrismaService } from '#infra/database/postgres/prisma.service.js'
import { Module } from '@nestjs/common'

@Module({
  providers: [
    PrismaService,
    {
      provide: IListPlatformsRepository,
      useClass: PlatformRepository,
    },
  ],
  exports: [IListPlatformsRepository],
})
export class PlatformRepositoryModule {}
