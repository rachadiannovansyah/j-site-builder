import { removeAllCookies } from '@/common/helpers/cookie'
import { IUser } from '~/types/stores/auth'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as null | IUser,
  }),
  getters: {
    userName(state) {
      return state.user?.role.name
    },
  },
  actions: {
    logout() {
      removeAllCookies()
    },
    setUser(user: IUser) {
      this.user = user
    },
  },
})
