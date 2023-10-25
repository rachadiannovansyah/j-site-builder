import { AsyncDataOptions } from '#app'

import FetchFactory from '../../factory'
import { IProductResponse } from '../type'

class ProductModules extends FetchFactory {
  private RESOURCE = '/products'

  async getProducts(options?: AsyncDataOptions<IProductResponse>) {
    return useAsyncData(() => {
      return this.call<IProductResponse>('GET', `${this.RESOURCE}`, undefined)
    }, options)
  }

  // ..add another API here
}

export default ProductModules
