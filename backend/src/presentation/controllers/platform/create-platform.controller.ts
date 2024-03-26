import { ICreatePlatform } from '#domain/usecases/platform/create-platform.js'
import { Body, Controller, Post } from '@nestjs/common'
import { IsNotEmpty, IsUrl } from 'class-validator'

class CreatePlatformBodyDto {
  @IsUrl()
  img: string

  @IsNotEmpty()
  name: string
}

@Controller()
export class CreatePlatformController {
  constructor(private readonly createPlatformService: ICreatePlatform) {}

  @Post('/platform')
  async handle(
    @Body() body: CreatePlatformBodyDto
  ): Promise<{ message: string }> {
    await this.createPlatformService.create(body)

    return {
      message: 'Plataforma cadastrada com sucesso',
    }
  }
}
