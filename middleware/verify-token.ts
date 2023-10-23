import { setCookie } from '@/common/helpers/cookie'

export default defineNuxtRouteMiddleware((to) => {
  const siteStore = useSiteStore()
  const loadingStore = useLoadingStore()

  const token = to.params?.token?.toString() ?? ''
  const siteId = to.query?.id?.toString() ?? ''

  if (!token && !siteId) {
    abortNavigation()
  }

  loadingStore.setLoading(true)

  setTimeout(() => {
    setCookie('token', token)
    siteStore.setSideId(siteId)

    loadingStore.setLoading(false)

    navigateTo('/')
  }, 1500)
})
