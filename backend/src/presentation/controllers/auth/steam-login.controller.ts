/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */

/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ICreateUser } from '#domain/usecases/user/create-user.js'
import { login } from '#presentation/utils/http-response.js'
import type { AuthResponse } from '#presentation/utils/http-response.js'
import { Controller, Get, Inject, Req, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

@Controller()
export class SteamLoginController {
  constructor(
    @Inject('ICreateSteamUser')
    private readonly createUserService: ICreateUser
  ) {}

  @Get('/auth/login/steam')
  @UseGuards(AuthGuard('steam'))
  // eslint-disable-next-line @typescript-eslint/class-methods-use-this, @typescript-eslint/no-empty-function
  async login(): Promise<void> {}

  @Get('/auth/login/steam/redirect')
  @UseGuards(AuthGuard('steam'))
  async redirect(@Req() req: Express.Request): Promise<AuthResponse> {
    const { user, token } = await this.createUserService.create({
      ...req.user!,
      displayName: req.user?.name!,
      password: '',
    })

    return login(user, token)
  }
}
