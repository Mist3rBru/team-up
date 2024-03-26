import { UnauthorizedException, createParamDecorator } from '@nestjs/common'
import type { ExecutionContext } from '@nestjs/common'
import type { Request } from 'express'

export const Token = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>()
    const token = request.headers.authorization

    if (!token) {
      throw new UnauthorizedException('Acesso negado')
    }

    return token
  }
)
