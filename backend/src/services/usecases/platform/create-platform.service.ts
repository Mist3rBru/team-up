import { Platform } from '#domain/entities/platform-entity.js'
import type { ICreatePlatform } from '#domain/usecases/platform/create-platform.js'
import { ICreatePlatformRepository } from '#services/protocols/database/platform-repository.js'
import { Injectable } from '@nestjs/common'

@Injectable()
export class CreatePlatformService implements ICreatePlatform {
  constructor(
    private readonly createPlatformRepository: ICreatePlatformRepository
  ) {}

  async create(data: OnlyRequired<Platform.Params>): Promise<Platform> {
    const platform = new Platform(data)

    await this.createPlatformRepository.create(platform)

    return platform
  }
}
