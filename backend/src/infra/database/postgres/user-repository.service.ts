import { User } from '#domain/entities/user-entity.js'
import { UserMapper } from '#domain/mappers/user-mapper.js'
import type {
  ICreateUserRepository,
  IFindUserByEmailRepository,
  IFindUserByIdRepository,
} from '#services/protocols/database/user-repository.js'
import { PrismaService } from '#infra/database/postgres/prisma.service.js'
import { Injectable } from '@nestjs/common'

interface IUserRepository
  extends ICreateUserRepository,
    IFindUserByEmailRepository,
    IFindUserByIdRepository {}

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly db: PrismaService) {}

  async create(data: User): Promise<void> {
    await this.db.user.create({
      data: new UserMapper(data).toPrisma(),
    })
  }

  async findById(id: string): Promise<User | null> {
    const data = await this.db.user.findUnique({
      where: {
        id,
      },
    })

    if (!data) {
      return null
    }

    return new User(data)
  }

  async findByEmail(email: string): Promise<User | null> {
    const data = await this.db.user.findUnique({
      where: {
        email,
      },
    })

    if (!data) {
      return null
    }

    return new User(data)
  }

  async update(data: User): Promise<void> {
    await this.db.user.update({
      data: new UserMapper(data).toPrisma(),
      where: {
        id: data.id,
      },
    })
  }
}
