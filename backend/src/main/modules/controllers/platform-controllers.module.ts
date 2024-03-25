import { IListPlatformGames } from '#domain/usecases/platform/list-platform-games.js'
import { IListPlatforms } from '#domain/usecases/platform/list-platforms.js'
import { ListPlatformGamesController } from '#presentation/controllers/platform/list-platform-games.controller.js'
import { ListPlatformsController } from '#presentation/controllers/platform/list-platforms.controller.js'
import { PlatformRepository } from '#infra/database/postgres/platform-repository.service.js'
import { PrismaService } from '#infra/database/postgres/prisma.service.js'
import { PlatformRepositoryModule } from '#main/modules/repositories/platform-repository.module.js'
import { Module } from '@nestjs/common'

@Module({
  imports: [PlatformRepositoryModule],
  controllers: [ListPlatformsController, ListPlatformGamesController],
  providers: [
    PrismaService,
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
