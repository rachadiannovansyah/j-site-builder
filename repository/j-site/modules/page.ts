import { AsyncDataOptions } from '#app'
import { FetchOptions } from 'ofetch'

import FetchFactory from '../../factory'
import {
  IPageResponse,
  IPageData,
  IPagesResponse,
  IPageDetailResponse,
  IPagePreviewResponse,
} from '../types/page'

class PageModules extends FetchFactory {
  private RESOURCE = '/v1/pages'

  async getPages(
    id: string,
    fetchOptions?: FetchOptions<'json'>,
    options?: AsyncDataOptions<IPagesResponse>,
  ) {
    return useAsyncData(() => {
      return this.call<IPagesResponse>(
        'GET',
        `${this.RESOURCE}/${id}`,
        undefined, // body
        fetchOptions,
      )
    }, options)
  }

  async getPageById(
    idSetting: string,
    idPage: string,
    options?: AsyncDataOptions<IPageDetailResponse>,
  ) {
    return useAsyncData(() => {
      return this.call<IPageDetailResponse>(
        'GET',
        `${this.RESOURCE}/${idSetting}/${idPage}`,
        undefined, // body
      )
    }, options)
  }

  async storePage(
    id: string,
    body?: IPageData,
    options?: AsyncDataOptions<IPageResponse>,
  ) {
    return useAsyncData(() => {
      return this.call<IPageResponse>('POST', `${this.RESOURCE}/${id}`, body)
    }, options)
  }

  async updatePage(
    idSetting: string,
    idPage: string,
    body?: IPageData,
    options?: AsyncDataOptions<IPageResponse>,
  ) {
    return useAsyncData(() => {
      return this.call<IPageResponse>(
        'PUT',
        `${this.RESOURCE}/${idSetting}/${idPage}`,
        body,
      )
    }, options)
  }

  async storePreview(
    idSetting: string,
    body?: IPageData,
    options?: AsyncDataOptions<IPagePreviewResponse>,
  ) {
    return useAsyncData(() => {
      return this.call<IPagePreviewResponse>(
        'POST',
        `${this.RESOURCE}/${idSetting}/previews`,
        body,
      )
    }, options)
  }
}

export default PageModules
