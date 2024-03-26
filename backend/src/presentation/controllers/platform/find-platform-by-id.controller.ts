import { PlatformMapper } from '#domain/mappers/platform-mapper.js'
import { IFindPlatformById } from '#domain/usecases/platform/find-platform-by-id.js'
import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common'

@Controller()
export class FindPlatformByIdController {
  constructor(private readonly listPlatformGamesService: IFindPlatformById) {}

  @Get('/platforms/:platformId')
  async handle(
    @Param('platformId', ParseUUIDPipe) platformId: string
  ): Promise<ReturnType<PlatformMapper['toHttp']>> {
    const platform = await this.listPlatformGamesService.findById(platformId)

    return new PlatformMapper(platform).toHttp()
  }
}
