import { ICreateGame } from '#domain/usecases/game/create-game.js'
import { IListGameTeams } from '#domain/usecases/game/list-game-teams.js'
import { CreateGameController } from '#presentation/controllers/game/create-game.controller.js'
import { ImportSteamGamesController } from '#presentation/controllers/game/import-steam-games.controller.js'
import { ListGameTeamsController } from '#presentation/controllers/game/list-game-teams.controller.js'
import { IFetchBuilder } from '#services/protocols/data/fetch-builder.js'
import { CreateGameService } from '#services/usecases/game/create-game.service.js'
import { ImportSteamGamesService } from '#services/usecases/game/import-steam-games.service.js'
import { AxiosAdapter } from '#infra/adapters/axios-adapter.js'
import { GameRepository } from '#infra/database/postgres/game-repository.service.js'
import { PrismaService } from '#infra/database/postgres/prisma.service.js'
import { GameRepositoryModule } from '#main/modules/repositories/game-repository.module.js'
import { UserRepositoryModule } from '#main/modules/repositories/user-repository.module.js'
import { Module } from '@nestjs/common'
import { PlatformRepositoryModule } from '#main/modules/repositories/platform-repository.module.js'

@Module({
  imports: [GameRepositoryModule, UserRepositoryModule, PlatformRepositoryModule],
  controllers: [
    CreateGameController,
    ListGameTeamsController,
    ImportSteamGamesController,
  ],
  providers: [
    PrismaService,
    {
      provide: IFetchBuilder,
      useClass: AxiosAdapter,
    },
    {
      provide: ICreateGame,
      useClass: CreateGameService,
    },
    {
      provide: IListGameTeams,
      useClass: GameRepository,
    },
    {
      provide: 'IImportSteamGames',
      useClass: ImportSteamGamesService,
    },
  ],
})
export class GameControllersModule {}
