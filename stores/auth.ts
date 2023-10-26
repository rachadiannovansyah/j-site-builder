import { removeAllCookies } from '@/common/helpers/cookie'

export const useAuthStore = defineStore('auth', {
  actions: {
    logout() {
      removeAllCookies()
    },
  },
})
