import { AsyncDataOptions } from '#app'
import { FetchOptions } from 'ofetch'

import { ICategoryResponse } from '../types/category'

import FetchFactory from '../../factory'

class CategoryModules extends FetchFactory {
  private RESOURCE = '/v1/categories'

  async getCategory(
    id: string,
    fetchOptions?: FetchOptions<'json'>,
    options?: AsyncDataOptions<ICategoryResponse>,
  ) {
    return useAsyncData(() => {
      return this.call<ICategoryResponse>(
        'GET',
        `${this.RESOURCE}/${id}`,
        undefined, // body
        fetchOptions,
      )
    }, options)
  }
}

export default CategoryModules
