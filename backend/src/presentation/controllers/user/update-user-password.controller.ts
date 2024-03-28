import { User } from '#domain/entities/user-entity.js'
import { IUpdateUserPassword } from '#domain/usecases/user/update-user-password.js'
import { Token } from '#presentation/decorators/token.decorator.js'
import { ok } from '#presentation/utils/http-response.js'
import type { HttpResponse } from '#presentation/utils/http-response.js'
import { Body, Controller, Put } from '@nestjs/common'
import { MinLength } from 'class-validator'

class UpdateUserPasswordBodyDto {
  @MinLength(User.MIN_PASSWORD_LENGTH)
  password: string

  @MinLength(User.MIN_PASSWORD_LENGTH)
  confirmPassword: string
}

@Controller()
export class UpdateUserPasswordController {
  constructor(
    private readonly updateUserPasswordService: IUpdateUserPassword
  ) {}

  @Put('/user/password')
  async handle(
    @Body() body: UpdateUserPasswordBodyDto,
    @Token() token: string
  ): Promise<HttpResponse> {
    await this.updateUserPasswordService.update({ data: body, token })

    return ok('senha atualizada com sucesso')
  }
}
