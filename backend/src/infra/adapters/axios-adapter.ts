import { IFetchBuilder } from '#services/protocols/data/fetcher.js'
import { Injectable } from '@nestjs/common'
import axios from 'axios'
import type { RawAxiosRequestHeaders } from 'axios'

@Injectable()
export class AxiosAdapter extends IFetchBuilder {
  async fetch<TResponse>(): Promise<TResponse> {
    const { body, headers, method, params, url } = this.props
    const { data } = await axios<TResponse>(url + params, {
      method,
      headers: headers as RawAxiosRequestHeaders,
      data: body,
    })

    return data
  }
}
