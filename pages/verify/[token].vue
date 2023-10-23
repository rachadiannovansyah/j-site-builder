<script setup>
  import { setCookie } from '@/common/helpers/cookie.ts'
  import { onMounted } from 'vue'

  const site = useSiteStore()
  const loading = useLoadingStore()
  const route = useRoute()

  onMounted(() => {
    loading.setLoading(true)

    const token = route.params.token
    const siteId = route.query.id

    if (token && siteId) {
      setTimeout(() => {
        site.setSideId(siteId)
        setCookie('token', token)

        loading.setLoading(false)
        navigateTo('/')
      }, 1500)
    }
  })
</script>
