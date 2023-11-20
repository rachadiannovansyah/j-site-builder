import { AsyncDataOptions } from '#app'
import { FetchOptions } from 'ofetch'

import FetchFactory from '../../factory'
import { ISettingsResponse, ISettingResponse } from '../types/settings'

class TemplateModules extends FetchFactory {
  private RESOURCE = '/v1/settings'

  async getSettings(
    fetchOptions?: FetchOptions<'json'>,
    options?: AsyncDataOptions<ISettingsResponse>,
  ) {
    return useAsyncData(() => {
      return this.call<ISettingsResponse>(
        'GET',
        `${this.RESOURCE}`,
        undefined, // body
        fetchOptions,
      )
    }, options)
  }

  async getSettingsById(
    id: string,
    fetchOptions?: FetchOptions<'json'>,
    options?: AsyncDataOptions<ISettingResponse>,
  ) {
    return useAsyncData(() => {
      return this.call<ISettingResponse>(
        'GET',
        `${this.RESOURCE}/${id}`,
        undefined, // body
        fetchOptions,
      )
    }, options)
  }
}

export default TemplateModules
