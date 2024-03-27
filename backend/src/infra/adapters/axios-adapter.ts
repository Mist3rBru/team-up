import { IFetchBuilder } from '#services/protocols/data/fetch-builder.js'
import axios from 'axios'
import type { RawAxiosRequestHeaders } from 'axios'

export class AxiosAdapter extends IFetchBuilder {
  async fetch<TResponse>(): Promise<TResponse> {
    const { data } = await axios<TResponse>(this.buildUrl(), {
      method: this._method,
      headers: this._headers as RawAxiosRequestHeaders,
    })

    return data
  }
}
