export abstract class IFetchBuilder {
  protected _method: IRequestBuilder.Method = 'get'
  protected _url: string = ''
  protected _params: string = ''
  protected _headers: Record<string, unknown> = {}
  protected _body: Record<string, unknown> = {}

  public method(method: IRequestBuilder.Method): this {
    this._method = method

    return this
  }

  public url(...url: (string | number)[]): this {
    this._url = url.join('/').replaceAll(/\/{2,}/g, '/')

    return this
  }

  public params(
    params: Record<string, string | number | (string | number)[]>
  ): this {
    this._params = Object.entries(params)
      .map(
        ([param, value], i) =>
          `${i === 0 ? '?' : '&'}${param}=${Array.isArray(value) ? value.join(',') : value}`
      )
      .join('')

    return this
  }

  public headers(headers: Record<string, unknown>): this {
    this._headers = headers

    return this
  }

  public body(body: Record<string, unknown>): this {
    this._body = body

    return this
  }

  public buildUrl(): string {
    return this._url + this._params
  }

  abstract fetch<TResponse>(): Promise<TResponse>
}

export namespace IRequestBuilder {
  export type Method = 'get'
}
