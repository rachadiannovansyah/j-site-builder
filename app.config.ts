import buttonStyle from '~/assets/nuxt-ui/button'

export default defineAppConfig({
  ui: {
    primary: 'green',
    gray: 'cool',
    button: { ...buttonStyle }
  },
})
