import { UserMapper } from '#domain/mappers/user-mapper.js'
import { IFindUserById } from '#domain/usecases/user/find-user-by-id.js'
import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common'

@Controller()
export class FindUserByIdController {
  constructor(private readonly findUserByIdService: IFindUserById) {}

  @Get('/users/:userId')
  async handle(
    @Param('userId', ParseUUIDPipe) userId: string
  ): Promise<ReturnType<UserMapper['toPublic']>> {
    const user = await this.findUserByIdService.findById(userId)

    return new UserMapper(user).toPublic()
  }
}
