import { IListGameTeams } from '#domain/usecases/game/list-game-teams.js'
import { GameRepository } from '#infra/database/postgres/game-repository.service.js'
import { PrismaService } from '#infra/database/postgres/prisma.service.js'
import { Module } from '@nestjs/common'

@Module({
  providers: [
    PrismaService,
    {
      provide: IListGameTeams,
      useClass: GameRepository,
    },
  ],
})
export class GameRepositoryModule {}
