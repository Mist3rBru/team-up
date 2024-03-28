import { UserMapper } from '#domain/mappers/user-mapper.js'
import { ICreateUser } from '#domain/usecases/user/create-user.js'
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
  async handle(@Body() body: CreateUserBodyDto): Promise<{
    user: ReturnType<UserMapper['toPublic']>
    token: string
  }> {
    const { user, token } = await this.createUserService.create(body)

    return {
      user: new UserMapper(user).toPublic(),
      token,
    }
  }
}
