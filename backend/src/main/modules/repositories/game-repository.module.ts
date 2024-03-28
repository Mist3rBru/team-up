import {
  ICreateGameRepository,
  IListGameTeamsRepository,
  IUpsertGameRepository,
  IUpsertUserGameRepository,
} from '#services/protocols/database/game-repository.js'
import { GameRepository } from '#infra/database/postgres/game-repository.service.js'
import { PrismaService } from '#infra/database/postgres/prisma.service.js'
import { Module } from '@nestjs/common'

@Module({
  providers: [
    PrismaService,
    {
      provide: ICreateGameRepository,
      useClass: GameRepository,
    },
    {
      provide: IUpsertGameRepository,
      useClass: GameRepository,
    },
    {
      provide: IUpsertUserGameRepository,
      useClass: GameRepository,
    },
    {
      provide: IListGameTeamsRepository,
      useClass: GameRepository,
    },
  ],
  exports: [
    ICreateGameRepository,
    IUpsertGameRepository,
    IUpsertUserGameRepository,
    IListGameTeamsRepository,
  ],
})
export class GameRepositoryModule {}
