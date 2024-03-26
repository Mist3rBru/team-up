import { Game } from '#domain/entities/game-entity.js'
import type { ICreateGame } from '#domain/usecases/game/create-game.js'
import { ICreateGameRepository } from '#services/protocols/database/game-repository.js'
import { Injectable } from '@nestjs/common'

@Injectable()
export class CreateGameService implements ICreateGame {
  constructor(private readonly createGameRepository: ICreateGameRepository) {}

  async create(data: ICreateGame.Params): Promise<Game> {
    const { platforms, ...gameParams } = data
    const game = new Game(gameParams)

    await this.createGameRepository.create(game, platforms)

    return game
  }
}
