import { ICreateUser } from '#domain/usecases/user/create-user.js'
import { IFindUserById } from '#domain/usecases/user/find-user-by-id.js'
import { login } from '#presentation/utils/http-response.js'
import type { AuthResponse } from '#presentation/utils/http-response.js'
import { createSteamRedirectUrl } from '#presentation/utils/steam-api.js'
import { Controller, Get, Inject, Req, Res } from '@nestjs/common'
import type { Request, Response } from 'express'

@Controller()
export class SteamLoginController {
  constructor(
    @Inject('IFindSteamUserById')
    private readonly findSteamUserByIdService: IFindUserById,
    @Inject('ICreateSteamUser')
    private readonly createSteamUserService: ICreateUser
  ) {}

  @Get('/auth/login/steam')
  async login(@Res() res: Response): Promise<void> {
    res.redirect(createSteamRedirectUrl('/auth/login/steam/redirect'))
  }

  @Get('/auth/login/steam/redirect')
  async redirect(@Req() req: Request): Promise<AuthResponse> {
    const query = req.query as { 'openid.identity': string }
    const steamId = query['openid.identity'].replace(/.+\/(\w+)/, '$1')
    const steamUser = await this.findSteamUserByIdService.findById(steamId)
    const { user, token } = await this.createSteamUserService.create(steamUser)

    return login(user, token)
  }
}
