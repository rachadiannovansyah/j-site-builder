import { AsyncDataOptions } from '#app'

import FetchFactory from '../../factory'
import { ICategoriesResponse, ICategoryRequestBody } from '../types/category'
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

  async updateCategory(
    settingId: string,
    categoryId: string,
    body: ICategoryRequestBody,
    options?: AsyncDataOptions<ICategoriesResponse>,
  ) {
    return useAsyncData(() => {
      return this.call<ICategoriesResponse>(
        'PATCH',
        `${this.RESOURCE}/${settingId}/${categoryId}`,
        body,
      )
    }, options)
  }

  async createCategory(
    settingId: string,
    body: ICategoryRequestBody,
    options?: AsyncDataOptions<ICategoriesResponse>,
  ) {
    return useAsyncData(() => {
      return this.call<ICategoriesResponse>(
        'POST',
        `${this.RESOURCE}/${settingId}`,
        body,
      )
    }, options)
  }
}

export default CategoryModules
