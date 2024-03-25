import { PlatformMapper } from '#domain/mappers/platform-mapper.js'
import { IListPlatforms } from '#domain/usecases/platform/list-platforms.js'
import { Controller, Get } from '@nestjs/common'

@Controller()
export class ListPlatformsController {
  constructor(private readonly listPlatformsService: IListPlatforms) {}

  @Get('/platforms')
  async handle(): Promise<ReturnType<PlatformMapper['toHttp']>[]> {
    const platforms = await this.listPlatformsService.list()

    return platforms.map(platform => new PlatformMapper(platform).toHttp())
  }
}
