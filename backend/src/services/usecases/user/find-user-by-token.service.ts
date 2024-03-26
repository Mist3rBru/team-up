import type { User } from '#domain/entities/user-entity.js'
import type { IFindUserByToken } from '#domain/usecases/user/find-user-by-token.js'
import { IDecrypter } from '#services/protocols/data/encrypter.js'
import { IFindUserByIdRepository } from '#services/protocols/database/user-repository.js'
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'

@Injectable()
export class FindUserByTokenService implements IFindUserByToken {
  constructor(
    private readonly decrypter: IDecrypter,
    private readonly findUserByIdRepository: IFindUserByIdRepository
  ) {}

  async find(data: IFindUserByToken.Params): Promise<User | null> {
    const { token } = data

    const userId = await this.decrypter.decrypt<string>(token)

    if (!userId) {
      throw new UnauthorizedException('token de acesso inválido')
    }
    const user = await this.findUserByIdRepository.findById(userId)

    if (!user) {
      throw new NotFoundException('usuário não encontrado')
    }

    // TODO: verificar se usuário está na lista de acessos permitidos
    return user
  }
}
