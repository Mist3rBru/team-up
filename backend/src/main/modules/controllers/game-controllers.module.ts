import { IListGameTeams } from '#domain/usecases/game/list-game-teams.js'
import { ListGameTeamsController } from '#presentation/controllers/game/list-game-teams.controller.js'
import { GameRepository } from '#infra/database/postgres/game-repository.service.js'
import { PrismaService } from '#infra/database/postgres/prisma.service.js'
import { GameRepositoryModule } from '#main/modules/repositories/game-repository.module.js'
import { Module } from '@nestjs/common'

@Module({
  imports: [GameRepositoryModule],
  controllers: [ListGameTeamsController],
  providers: [
    PrismaService,
    {
      provide: IListGameTeams,
      useClass: GameRepository,
    },
  ],
})
export class GameControllersModule {}
