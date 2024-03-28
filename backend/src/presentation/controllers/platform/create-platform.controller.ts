import { ICreatePlatform } from '#domain/usecases/platform/create-platform.js'
import { created } from '#presentation/utils/http-reponse.js'
import type { HttpResponse } from '#presentation/utils/http-reponse.js'
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
  async handle(@Body() body: CreatePlatformBodyDto): Promise<HttpResponse> {
    await this.createPlatformService.create(body)

    return created('Plataforma cadastrada com sucesso')
  }
}
