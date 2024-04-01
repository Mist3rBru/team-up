import { ICreateGame } from '#domain/usecases/game/create-game.js'
import { IFindGameById } from '#domain/usecases/game/find-game-by-id.js'
import { CreateGameController } from '#presentation/controllers/game/create-game.controller.js'
import { FindGameByIdController } from '#presentation/controllers/game/find-game-by-id.controller.js'
import { ImportSteamGamesController } from '#presentation/controllers/game/import-steam-games.controller.js'
import { IFetchBuilder } from '#services/protocols/data/fetch-builder.js'
import { CreateGameService } from '#services/usecases/game/create-game.service.js'
import { FindGameByIdService } from '#services/usecases/game/find-game-by-id.service.js'
import { ImportSteamGamesService } from '#services/usecases/game/import-steam-games.service.js'
import { AxiosAdapter } from '#infra/adapters/axios-adapter.js'
import { GameRepositoryModule } from '#main/modules/repositories/game-repository.module.js'
import { PlatformRepositoryModule } from '#main/modules/repositories/platform-repository.module.js'
import { UserRepositoryModule } from '#main/modules/repositories/user-repository.module.js'
import { Module } from '@nestjs/common'

@Module({
  imports: [
    GameRepositoryModule,
    UserRepositoryModule,
    PlatformRepositoryModule,
  ],
  controllers: [
    CreateGameController,
    FindGameByIdController,
    ImportSteamGamesController,
  ],
  providers: [
    {
      provide: IFetchBuilder,
      useClass: AxiosAdapter,
    },
    {
      provide: ICreateGame,
      useClass: CreateGameService,
    },
    {
      provide: IFindGameById,
      useClass: FindGameByIdService,
    },
    {
      provide: 'IImportSteamGames',
      useClass: ImportSteamGamesService,
    },
  ],
})
export class GameControllersModule {}
