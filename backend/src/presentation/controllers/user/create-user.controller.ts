import { ICreateUser } from '#domain/usecases/user/create-user.js'
import { login } from '#presentation/utils/http-response.js'
import type { AuthResponse } from '#presentation/utils/http-response.js'
import { Body, Controller, Post } from '@nestjs/common'
import { IsNotEmpty, IsString } from 'class-validator'

class CreateUserBodyDto {
  @IsNotEmpty()
  name: string

  @IsNotEmpty()
  displayName: string

  @IsString()
  @IsNotEmpty()
  password: string

  @IsString()
  @IsNotEmpty()
  confirmPassword: string
}

@Controller()
export class CreateUserController {
  constructor(private readonly createUserService: ICreateUser) {}

  @Post('/user')
  async handle(@Body() body: CreateUserBodyDto): Promise<AuthResponse> {
    const { user, token } = await this.createUserService.create(body)

    return login(user, token)
  }
}
