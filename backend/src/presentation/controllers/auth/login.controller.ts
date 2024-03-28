import { User } from '#domain/entities/user-entity.js'
import { IAuthUser } from '#domain/usecases/authentication/auth-user.js'
import { login } from '#presentation/utils/http-response.js'
import type { AuthResponse } from '#presentation/utils/http-response.js'
import { Body, Controller, Post } from '@nestjs/common'
import { IsNotEmpty, MinLength } from 'class-validator'

class LoginBodyDto {
  @IsNotEmpty()
  name: string

  @MinLength(User.MIN_PASSWORD_LENGTH)
  password: string
}

@Controller()
export class LoginController {
  constructor(private readonly authUserService: IAuthUser) {}

  @Post('/auth/login')
  async handle(@Body() body: LoginBodyDto): Promise<AuthResponse> {
    const { user, token } = await this.authUserService.auth(body)

    return login(user, token)
  }
}
