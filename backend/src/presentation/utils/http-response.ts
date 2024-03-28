import type { User } from '#domain/entities/user-entity.js'
import { UserMapper } from '#domain/mappers/user-mapper.js'

export interface HttpResponse {
  statusCode: number
  error?: string | null
  message?: string
}

export const ok = (message: string): HttpResponse => ({
  statusCode: 200,
  message,
})

export const created = (message: string): HttpResponse => ({
  statusCode: 201,
  message,
})

export interface AuthResponse extends HttpResponse {
  user: ReturnType<UserMapper['toLogin']>
  token: string
}

export const login = (user: User, token: string): AuthResponse => ({
  statusCode: 200,
  token,
  user: new UserMapper(user).toLogin(),
})
