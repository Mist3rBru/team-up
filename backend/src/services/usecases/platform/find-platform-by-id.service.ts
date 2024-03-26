import type { Platform } from '#domain/entities/platform-entity.js'
import type { IFindPlatformById } from '#domain/usecases/platform/find-platform-by-id.js'
import { IFindPlatformByIdRepository } from '#services/protocols/database/platform-repository.js'
import { Injectable, NotFoundException } from '@nestjs/common'

@Injectable()
export class FindPlatformByIdService implements IFindPlatformById {
  constructor(
    private readonly findPlatformByIdRepository: IFindPlatformByIdRepository
  ) {}

  async findById(platformId: string): Promise<Platform> {
    const platform = await this.findPlatformByIdRepository.findById(platformId)

    if (!platform) {
      throw new NotFoundException('plataforma não encontrada')
    }

    return platform
  }
}
