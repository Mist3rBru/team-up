/* eslint-disable @typescript-eslint/no-non-null-assertion */

/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */

/* eslint-disable no-secrets/no-secrets */
import { UserMapper } from '#domain/mappers/user-mapper.js'
import { ICreateUser } from '#domain/usecases/user/create-user.js'
import { Controller, Get, Inject, Req, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

@Controller()
export class SteamLoginController {
  constructor(
    @Inject('ICreateSteamUser')
    private readonly createUserRepository: ICreateUser
  ) {}

  @Get('/auth/login/steam')
  @UseGuards(AuthGuard('steam'))
  // eslint-disable-next-line @typescript-eslint/class-methods-use-this, @typescript-eslint/no-empty-function
  async login(): Promise<void> {}

  @Get('/auth/login/steam/redirect')
  @UseGuards(AuthGuard('steam'))
  // eslint-disable-next-line @typescript-eslint/class-methods-use-this, @typescript-eslint/no-empty-function
  async redirect(@Req() req: Express.Request): Promise<{
    user: ReturnType<UserMapper['toPublic']>
    token: string
  }> {
    const { user, token } = await this.createUserRepository.create({
      ...req.user!,
      displayName: req.user?.name!,
      password: '',
    })

    return {
      user: new UserMapper(user).toPublic(),
      token,
    }
  }
}
