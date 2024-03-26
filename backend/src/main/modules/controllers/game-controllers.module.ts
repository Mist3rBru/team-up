import { ICreateGame } from '#domain/usecases/game/create-game.js'
import { IListGameTeams } from '#domain/usecases/game/list-game-teams.js'
import { CreateGameController } from '#presentation/controllers/game/create-game.controller.js'
import { ListGameTeamsController } from '#presentation/controllers/game/list-game-teams.controller.js'
import { CreateGameService } from '#services/usecases/game/create-game.service.js'
import { GameRepository } from '#infra/database/postgres/game-repository.service.js'
import { PrismaService } from '#infra/database/postgres/prisma.service.js'
import { GameRepositoryModule } from '#main/modules/repositories/game-repository.module.js'
import { Module } from '@nestjs/common'

@Module({
  imports: [GameRepositoryModule],
  controllers: [CreateGameController, ListGameTeamsController],
  providers: [
    PrismaService,
    {
      provide: ICreateGame,
      useClass: CreateGameService,
    },
    {
      provide: IListGameTeams,
      useClass: GameRepository,
    },
  ],
})
export class GameControllersModule {}
