import type { User } from '#domain/entities/user-entity.js'
import { UserMapper } from '#domain/mappers/user-mapper.js'
import { ICreateUser } from '#domain/usecases/user/create-user.js'
import { Body, Controller, Post } from '@nestjs/common'
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

class CreateUserBodyDto {
  @IsNotEmpty()
  name: string

  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsString()
  @IsNotEmpty()
  password: string
}

@Controller()
export class CreateUserController {
  constructor(private readonly createUserService: ICreateUser) {}

  @Post('/user')
  async handle(@Body() body: CreateUserBodyDto): Promise<{
    user: User.Sample
    token: string
  }> {
    const { user, token } = await this.createUserService.create(body)

    return {
      user: new UserMapper(user).toSample(),
      token,
    }
  }
}
