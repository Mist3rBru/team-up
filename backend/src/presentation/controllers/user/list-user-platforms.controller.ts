import { PlatformMapper } from '#domain/mappers/platform-mapper.js'
import { IListUserPlatforms } from '#domain/usecases/user/list-user-platforms.js'
import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common'

@Controller()
export class ListUserPlatformsController {
  constructor(private readonly listUserPlatformsService: IListUserPlatforms) {}

  @Get('/users/:userId/platforms')
  async handle(
    @Param('userId', ParseUUIDPipe) userId: string
  ): Promise<ReturnType<PlatformMapper['toHttp']>[]> {
    const data = await this.listUserPlatformsService.listPlatforms(userId)

    return data.map(d => new PlatformMapper(d).toHttp())
  }
}
