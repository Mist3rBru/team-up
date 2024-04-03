import { ICreateGame } from '#domain/usecases/game/create-game.js'
import { IFindGameById } from '#domain/usecases/game/find-game-by-id.js'
import { CreateGameController } from '#presentation/controllers/game/create-game.controller.js'
import { FindGameByIdController } from '#presentation/controllers/game/find-game-by-id.controller.js'
import { ImportSteamGamesController } from '#presentation/controllers/game/import-steam-games.controller.js'
import { IFetchUserGames } from '#services/protocols/data/fetcher.js'
import { CreateGameService } from '#services/usecases/game/create-game.service.js'
import { FindGameByIdService } from '#services/usecases/game/find-game-by-id.service.js'
import { ImportSteamGamesService } from '#services/usecases/game/import-steam-games.service.js'
import { SteamAdapter } from '#infra/adapters/steam-adapter.js'
import { GameRepositoryModule } from '#main/modules/repositories/game-repository.module.js'
import { PlatformRepositoryModule } from '#main/modules/repositories/platform-repository.module.js'
import { UserRepositoryModule } from '#main/modules/repositories/user-repository.module.js'
import { AuthenticationServicesModule } from '#main/modules/services/authentication-services.module.js'
import { Module } from '@nestjs/common'

@Module({
  imports: [
    GameRepositoryModule,
    UserRepositoryModule,
    PlatformRepositoryModule,
    AuthenticationServicesModule,
  ],
  controllers: [
    CreateGameController,
    FindGameByIdController,
    ImportSteamGamesController,
  ],
  providers: [
    {
      provide: 'IFetchSteamUserGames',
      useFactory: (): IFetchUserGames =>
        new SteamAdapter(process.env.STEAM_SECRET),
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
