import { IUpdateUserSteam } from '#domain/usecases/user/update-user-steam.js'
import { Token } from '#presentation/decorators/token.decorator.js'
import { created } from '#presentation/utils/http-response.js'
import type { HttpResponse } from '#presentation/utils/http-response.js'
import { createSteamRedirectUrl } from '#presentation/utils/steam-api.js'
import { Controller, Get, Req, Res } from '@nestjs/common'
import type { Request, Response } from 'express'

@Controller()
export class UpdateUserSteamController {
  constructor(private readonly updateUserSteam: IUpdateUserSteam) {}

  @Get('/user/steam')
  async login(@Res() res: Response, @Token() token: string): Promise<void> {
    res.redirect(createSteamRedirectUrl(`/user/steam/redirect?token=${token}`))
  }

  @Get('/user/steam/redirect')
  async redirect(
    @Req() req: Request,
    @Token() token: string
  ): Promise<HttpResponse> {
    const query = req.query as { 'openid.identity': string }
    const steamId = query['openid.identity'].replace(/.+\/(\w+)/, '$1')
    await this.updateUserSteam.update({
      steamId,
      token,
    })

    return created('Conta Steam vinculada com sucesso')
  }
}
