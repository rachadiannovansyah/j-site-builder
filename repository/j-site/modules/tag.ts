import { AsyncDataOptions } from '#app'

import FetchFactory from '../../factory'
import { ITagResponse, ITagRequestBody } from '../types/tag'

class TagModules extends FetchFactory {
  private RESOURCE = '/v1/tags'

  async createTag(
    settingId: string,
    body: ITagRequestBody,
    options?: AsyncDataOptions<ITagResponse>,
  ) {
    return useAsyncData(() => {
      return this.call<ITagResponse>(
        'POST',
        `${this.RESOURCE}/${settingId}`,
        body,
      )
    }, options)
  }
}

export default TagModules
