import { IUpdateUser } from '#domain/usecases/user/update-user.js'
import { Token } from '#presentation/decorators/token.decorator.js'
import { ok } from '#presentation/utils/http-response.js'
import type { HttpResponse } from '#presentation/utils/http-response.js'
import { Body, Controller, Put } from '@nestjs/common'
import { IsEmail, IsNotEmpty } from 'class-validator'

class UpdateUserBodyDto {
  @IsNotEmpty()
  name: string

  @IsNotEmpty()
  displayName: string

  @IsEmail()
  email: string
}

@Controller()
export class UpdateUserController {
  constructor(private readonly updateUserService: IUpdateUser) {}

  @Put('/user')
  async handle(
    @Body() body: UpdateUserBodyDto,
    @Token() token: string
  ): Promise<HttpResponse> {
    await this.updateUserService.update({ data: body, token })

    return ok('usuário atualizado com sucesso')
  }
}
