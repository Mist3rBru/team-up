import { ICreatePlatform } from '#domain/usecases/platform/create-platform.js'
import { IFindPlatformById } from '#domain/usecases/platform/find-platform-by-id.js'
import { IListPlatforms } from '#domain/usecases/platform/list-platforms.js'
import { CreatePlatformController } from '#presentation/controllers/platform/create-platform.controller.js'
import { FindPlatformByIdController } from '#presentation/controllers/platform/find-platform-by-id.controller.js'
import { ListPlatformsController } from '#presentation/controllers/platform/list-platforms.controller.js'
import { CreatePlatformService } from '#services/usecases/platform/create-platform.service.js'
import { FindPlatformByIdService } from '#services/usecases/platform/find-platform-by-id.service.js'
import { PlatformRepository } from '#infra/database/postgres/platform-repository.service.js'
import { PrismaService } from '#infra/database/postgres/prisma.service.js'
import { PlatformRepositoryModule } from '#main/modules/repositories/platform-repository.module.js'
import { Module } from '@nestjs/common'

@Module({
  imports: [PlatformRepositoryModule],
  controllers: [
    CreatePlatformController,
    ListPlatformsController,
    FindPlatformByIdController,
  ],
  providers: [
    PrismaService,
    {
      provide: ICreatePlatform,
      useClass: CreatePlatformService,
    },
    {
      provide: IListPlatforms,
      useClass: PlatformRepository,
    },
    {
      provide: IFindPlatformById,
      useClass: FindPlatformByIdService,
    },
  ],
})
export class PlatformControllersModule {}
