import { UserMapper } from '#domain/mappers/user-mapper.js'
import { IFindUserByToken } from '#domain/usecases/user/find-user-by-token.js'
import { Token } from '#presentation/decorators/token.decorator.js'
import { Controller, Get } from '@nestjs/common'

@Controller()
export class FindUserByTokenController {
  constructor(private readonly findUserByTokenService: IFindUserByToken) {}

  @Get('/user')
  async handle(
    @Token() token: string
  ): Promise<ReturnType<UserMapper['toOwner']>> {
    const user = await this.findUserByTokenService.find({ token })

    return new UserMapper(user).toOwner()
  }
}
