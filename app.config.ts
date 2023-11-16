import buttonStyle from '~/assets/nuxt-ui/button'
import inputStyle from '~/assets/nuxt-ui/input'
import tableStyle from '~/assets/nuxt-ui/table'
import selectMenuStyle from '~/assets/nuxt-ui/select'

export default defineAppConfig({
  ui: {
    primary: 'green',
    gray: 'cool',
    button: { ...buttonStyle },
    input: { ...inputStyle },
    table: { ...tableStyle },
    selectMenu: {...selectMenuStyle}
  },
})
