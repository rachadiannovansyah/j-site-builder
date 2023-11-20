import { AsyncDataOptions } from '#app'

import FetchFactory from '../../factory'
import { ITemplatesResponse, ITemplateResponse } from '../types/template'
import { FetchOptions } from 'ofetch'

class TemplateModules extends FetchFactory {
  private RESOURCE = '/v1/templates'

  async getTemplates(options?: AsyncDataOptions<ITemplatesResponse>) {
    return useAsyncData(() => {
      return this.call<ITemplatesResponse>('GET', `${this.RESOURCE}`, undefined)
    }, options)
  }

  async getTemplateById(
    id: string,
    fetchOptions?: FetchOptions<'json'>,
    options?: AsyncDataOptions<ITemplateResponse>,
  ) {
    return useAsyncData(() => {
      return this.call<ITemplateResponse>(
        'GET',
        `${this.RESOURCE}/${id}`,
        undefined,
        fetchOptions,
      )
    }, options)
  }
}

export default TemplateModules
