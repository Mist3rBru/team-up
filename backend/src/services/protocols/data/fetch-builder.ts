export abstract class IFetchBuilder {
  protected props: {
    method: IFetchBuilder.Method
    url: string
    params: string
    headers: Record<string, unknown>
    body: Record<string, unknown>
  } = {
    url: '',
    method: 'get',
    params: '',
    body: {},
    headers: {},
  }

  public method(method: IFetchBuilder.Method): this {
    this.props.method = method

    return this
  }

  public url(...url: (string | number)[]): this {
    this.props.url = url.join('/')

    return this
  }

  public params(
    params: Record<string, string | number | (string | number)[]>
  ): this {
    this.props.params = Object.entries(params)
      .map(
        ([param, value], i) =>
          `${i === 0 ? '?' : '&'}${param}=${Array.isArray(value) ? value.join(',') : value}`
      )
      .join('')

    return this
  }

  public headers(headers: Record<string, unknown>): this {
    this.props.headers = headers

    return this
  }

  public body(body: Record<string, unknown>): this {
    this.props.body = body

    return this
  }

  abstract fetch<TResponse>(): Promise<TResponse>
}

export namespace IFetchBuilder {
  export type Method = 'get'
}
