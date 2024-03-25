import { Platform } from '#domain/entities/platform-entity.js'
import { PlatformMapper } from '#domain/mappers/platform-mapper.js'
import type { IListPlatformsRepository } from '#services/protocols/database/platform-repository.js'
import { Injectable } from '@nestjs/common'
import { PrismaService } from './prisma.service'

interface IPlatformRepository extends IListPlatformsRepository {}

@Injectable()
export class PlatformRepository implements IPlatformRepository {
  constructor(private readonly db: PrismaService) {}

  async create(data: Platform): Promise<void> {
    await this.db.platform.create({
      data: new PlatformMapper(data).toPrisma(),
    })
  }

  async list(): Promise<Platform[]> {
    const data = await this.db.platform.findMany()

    return data.map(d => new Platform(d))
  }

  async findById(id: string): Promise<Platform | null> {
    const data = await this.db.platform.findUnique({
      where: {
        id,
      },
    })

    if (!data) {
      return null
    }

    return new Platform(data)
  }

  async update(data: Platform): Promise<void> {
    await this.db.platform.update({
      data: new PlatformMapper(data).toPrisma(),
      where: {
        id: data.id,
      },
    })
  }

  async delete(id: string): Promise<void> {
    await this.db.platform.delete({
      where: {
        id,
      },
    })
  }
}
