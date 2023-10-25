import { AsyncDataOptions } from '#app'

import FetchFactory from '../../factory'
import { IUserResponse } from '../type'

class UsersModule extends FetchFactory {
  private RESOURCE = '/users'

  async getUsers(options?: AsyncDataOptions<IUserResponse>) {
    return useAsyncData(() => {
      return this.call<IUserResponse>('GET', `${this.RESOURCE}`, undefined)
    }, options)
  }
}

export default UsersModule
