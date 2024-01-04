import { AsyncDataOptions } from '#app'

import FetchFactory from '../../factory'
import { ICategoriesResponse } from '../types/category'
import { FetchOptions } from 'ofetch'

class CategoryModules extends FetchFactory {
  private RESOURCE = '/v1/categories'

  async getCategories(
    settingId: string,
    fetchOptions?: FetchOptions<'json'>,
    options?: AsyncDataOptions<ICategoriesResponse>,
  ) {
    return useAsyncData(() => {
      return this.call<ICategoriesResponse>(
        'GET',
        `${this.RESOURCE}/${settingId}`,
        undefined,
        fetchOptions,
      )
    }, options)
  }
}

export default CategoryModules
