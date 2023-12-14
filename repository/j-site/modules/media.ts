import { AsyncDataOptions } from '#app'
import { FetchOptions } from 'ofetch'

import { IStoreMediaResponse, IDeleteMediaResponse } from '../types/media'

import FetchFactory from '../../factory'

class MediaModules extends FetchFactory {
  private RESOURCE = '/v1/media'

  async uploadMedia(
    formData: FormData,
    fetchOptions?: FetchOptions<'json'>,
    options?: AsyncDataOptions<IStoreMediaResponse>,
  ) {
    return useAsyncData(() => {
      return this.call<IStoreMediaResponse>(
        'POST',
        `${this.RESOURCE}`,
        formData, // body
        fetchOptions,
      )
    }, options)
  }

  async deleteMedia(
    id: string,
    fetchOptions?: FetchOptions<'json'>,
    options?: AsyncDataOptions<IDeleteMediaResponse>,
  ) {
    return useAsyncData(() => {
      return this.call<IDeleteMediaResponse>(
        'DELETE',
        `${this.RESOURCE}/${id}`,
        undefined, // body
        fetchOptions,
      )
    }, options)
  }
}

export default MediaModules
