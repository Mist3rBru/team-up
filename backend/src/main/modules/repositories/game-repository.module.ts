import {
  ICreateGameRepository,
  IFindGameByIdRepository,
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
      provide: IFindGameByIdRepository,
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
  ],
  exports: [
    ICreateGameRepository,
    IFindGameByIdRepository,
    IUpsertGameRepository,
    IUpsertUserGameRepository,
  ],
})
export class GameRepositoryModule {}
