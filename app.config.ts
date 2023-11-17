import buttonStyle from '~/assets/nuxt-ui/button'
import inputStyle from '~/assets/nuxt-ui/input'
import tableStyle from '~/assets/nuxt-ui/table'

export default defineAppConfig({
  ui: {
    primary: 'green',
    gray: 'cool',
    button: buttonStyle,
    input: inputStyle,
    table: tableStyle,
    modal: {
      overlay: {
        background: 'bg-black/50',
      },
      rounded: 'rounded-xl',
      width: 'sm:max-w-lg',
      transition: {
        enterFrom: 'sm:translate-y-20 sm:scale-100',
        leaveTo: 'sm:translate-y-20 sm:scale-100',
      },
    },
  },
})
