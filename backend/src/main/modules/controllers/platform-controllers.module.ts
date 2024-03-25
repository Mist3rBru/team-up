import { IListPlatforms } from '#domain/usecases/platform/list-platforms.js'
import { ListPlatformsController } from '#presentation/controllers/platform/list-platforms.controller.js'
import { PlatformRepository } from '#infra/database/postgres/platform-repository.service.js'
import { PrismaService } from '#infra/database/postgres/prisma.service.js'
import { PlatformRepositoryModule } from '#main/modules/repositories/platform-repository.module.js'
import { Module } from '@nestjs/common'

@Module({
  imports: [PlatformRepositoryModule],
  controllers: [ListPlatformsController],
  providers: [
    PrismaService,
    {
      provide: IListPlatforms,
      useClass: PlatformRepository,
    },
  ],
})
export class PlatformControllersModule {}
