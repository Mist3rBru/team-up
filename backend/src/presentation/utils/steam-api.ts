export function createSteamRedirectUrl(uriCallback: string): string {
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
    'openid.realm': `http://${process.env.APP_HOST}`,
    'openid.return_to': `http://${process.env.APP_HOST}${uriCallback}`,
  }

  return `https://steamcommunity.com/openid/login?${new URLSearchParams(redirectParams).toString()}`
}
