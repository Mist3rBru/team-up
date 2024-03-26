import { ICreatePlatform } from '#domain/usecases/platform/create-platform.js'
import { IListPlatformGames } from '#domain/usecases/platform/list-platform-games.js'
import { IListPlatforms } from '#domain/usecases/platform/list-platforms.js'
import { CreatePlatformController } from '#presentation/controllers/platform/create-platform.controller.js'
import { ListPlatformGamesController } from '#presentation/controllers/platform/list-platform-games.controller.js'
import { ListPlatformsController } from '#presentation/controllers/platform/list-platforms.controller.js'
import { CreatePlatformService } from '#services/usecases/platform/create-platform.service.js'
import { PlatformRepository } from '#infra/database/postgres/platform-repository.service.js'
import { PrismaService } from '#infra/database/postgres/prisma.service.js'
import { PlatformRepositoryModule } from '#main/modules/repositories/platform-repository.module.js'
import { Module } from '@nestjs/common'

@Module({
  imports: [PlatformRepositoryModule],
  controllers: [
    CreatePlatformController,
    ListPlatformsController,
    ListPlatformGamesController,
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
      provide: IListPlatformGames,
      useClass: PlatformRepository,
    },
  ],
})
export class PlatformControllersModule {}
