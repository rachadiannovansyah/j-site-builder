import { AsyncDataOptions } from '#app'
import { FetchOptions } from 'ofetch'

import { IMediaResponse } from '../types/media'

import FetchFactory from '../../factory'

class PageModules extends FetchFactory {
  private RESOURCE = '/v1/media'

  async uploadMedia(
    formData: FormData,
    fetchOptions?: FetchOptions<'json'>,
    options?: AsyncDataOptions<IMediaResponse>,
  ) {
    return useAsyncData(() => {
      return this.call<IMediaResponse>(
        'POST',
        `${this.RESOURCE}`,
        formData, // body
        fetchOptions,
      )
    }, options)
  }
}

export default PageModules
