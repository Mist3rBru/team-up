import type { Game } from '#domain/entities/game-entity.js'
import type { IFindGameById } from '#domain/usecases/game/find-game-by-id.js'
import { IFindGameByIdRepository } from '#services/protocols/database/game-repository.js'
import { Injectable, NotFoundException } from '@nestjs/common'

@Injectable()
export class FindGameByIdService implements IFindGameById {
  constructor(
    private readonly findGameByIdRepository: IFindGameByIdRepository
  ) {}

  async findById(platformId: string): Promise<Game> {
    const platform = await this.findGameByIdRepository.findById(platformId)

    if (!platform) {
      throw new NotFoundException('jogo não encontrado')
    }

    return platform
  }
}
