/* eslint-disable @typescript-eslint/require-await */
import type {
  IDecrypter,
  IEncrypter,
} from '#services/protocols/data/encrypter.js'
import jwt from 'jsonwebtoken'
import type { SignOptions, VerifyOptions } from 'jsonwebtoken'

export class JwtAdapter implements IEncrypter, IDecrypter {
  private readonly secret: string
  public readonly options: SignOptions & VerifyOptions

  constructor(params: { secret: string; expiresIn: string }) {
    this.secret = params.secret
    this.options = {
      algorithm: 'HS256',
      encoding: 'utf8',
      expiresIn: params.expiresIn,
    }
  }

  async encrypt(data: unknown): Promise<string> {
    const payload: JwtAdapter.Payload = { data }

    return jwt.sign(payload, this.secret, this.options)
  }

  async decrypt<TData>(token: string): Promise<TData | null> {
    try {
      const payload = jwt.verify(
        token,
        this.secret,
        this.options
      ) as JwtAdapter.Payload<TData>

      return payload.data ?? null
    } catch {
      return null
    }
  }
}

export namespace JwtAdapter {
  export interface Payload<TData = unknown> {
    data: TData
  }
}
