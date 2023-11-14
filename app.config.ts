import buttonStyle from '~/assets/nuxt-ui/button'
import inputStyle from '~/assets/nuxt-ui/input'

export default defineAppConfig({
  ui: {
    primary: 'green',
    gray: 'cool',
    button: { ...buttonStyle },
    input: { ...inputStyle },
  },
})
