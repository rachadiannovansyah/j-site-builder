import { AsyncDataOptions } from '#app'

import FetchFactory from '../../factory'
import { IPageResponse, IPageData } from '../types/page'

class PageModules extends FetchFactory {
  private RESOURCE = '/v1/pages'

  async storePage(
    id: string,
    body?: IPageData,
    options?: AsyncDataOptions<IPageResponse>,
  ) {
    return useAsyncData(() => {
      return this.call<IPageResponse>('POST', `${this.RESOURCE}/${id}`, body)
    }, options)
  }
}

export default PageModules
