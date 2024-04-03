import { ICreateUser } from '#domain/usecases/user/create-user.js'
import { IFindUserById } from '#domain/usecases/user/find-user-by-id.js'
import { login } from '#presentation/utils/http-response.js'
import type { AuthResponse } from '#presentation/utils/http-response.js'
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
    const redirectParams = {
      'openid.mode': 'checkid_setup',
      'openid.ns': 'http://specs.openid.net/auth/2.0',
      'openid.ns.sreg': 'http://openid.net/extensions/sreg/1.1',
      'openid.sreg.optional':
        'nickname,email,fullname,dob,gender,postcode,country,language,timezone',
      'openid.ns.ax': 'http://openid.net/srv/ax/1.0',
      'openid.ax.mode': 'fetch_request',
      'openid.ax.type.fullname': 'http://axschema.org/namePerson',
      'openid.ax.type.firstname': 'http://axschema.org/namePerson/first',
      'openid.ax.type.lastname': 'http://axschema.org/namePerson/last',
      'openid.ax.type.email': 'http://axschema.org/contact/email',
      'openid.ax.required': 'fullname,firstname,lastname,email',
      'openid.identity': 'http://specs.openid.net/auth/2.0/identifier_select',
      'openid.claimed_id': 'http://specs.openid.net/auth/2.0/identifier_select',
      'openid.return_to': `http://${process.env.APP_HOST}/auth/login/steam/redirect`,
      'openid.realm': `http://${process.env.APP_HOST}`,
    }

    const redirectURI = `https://steamcommunity.com/openid/login?${new URLSearchParams(redirectParams).toString()}`

    res.redirect(redirectURI)
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
