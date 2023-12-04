import { AsyncDataOptions } from '#app'

import FetchFactory from '../../factory'
import { ILogosResponse } from '../types/logo'
import { FetchOptions } from 'ofetch'

class TemplateModules extends FetchFactory {
  private RESOURCE = '/v1/logos'

  async getLogos(
    fetchOptions?: FetchOptions<'json'>,
    options?: AsyncDataOptions<ILogosResponse>,
  ) {
    return useAsyncData(() => {
      return this.call<ILogosResponse>(
        'GET',
        `${this.RESOURCE}`,
        undefined, // body
        fetchOptions,
      )
    }, options)
  }
}

export default TemplateModules
