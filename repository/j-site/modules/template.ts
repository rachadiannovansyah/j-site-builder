import { AsyncDataOptions } from '#app'

import FetchFactory from '../../factory'
import { ITemplateResponse } from '../types/template'

class TemplateModules extends FetchFactory {
  private RESOURCE = '/v1/templates'

  async getTemplates(options?: AsyncDataOptions<ITemplateResponse>) {
    return useAsyncData(() => {
      return this.call<ITemplateResponse>('GET', `${this.RESOURCE}`, undefined)
    }, options)
  }
}

export default TemplateModules
