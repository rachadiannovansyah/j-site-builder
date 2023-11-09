import { getCookie } from '@/common/helpers/cookie'
import { decode } from '~/common/helpers/jwt'

import { IUser } from '~/types/stores/auth'

export default defineNuxtRouteMiddleware((to) => {
  // disable middleware for `/verify` path
  if (to.path.includes('/verify')) return

  const cookie = getCookie('token')
  const authStore = useAuthStore()

  if (!cookie) {
    throw createError({
      statusCode: 401,
    })
  } else {
    if (authStore.user) return

    const decodedJWT = decode<IUser>(cookie)
    authStore.setUser(decodedJWT)
  }
})
