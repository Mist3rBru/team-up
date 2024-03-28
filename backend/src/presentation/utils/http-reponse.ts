export interface HttpResponse {
  statusCode: number
  error?: string | null
  message: string
}

export const ok = (message: string): HttpResponse => ({
  statusCode: 200,
  message,
})

export const created = (message: string): HttpResponse => ({
  statusCode: 201,
  message,
})
