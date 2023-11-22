export default defineAppConfig({
  ui: {
    primary: 'green',
    gray: 'cool',
    button: {
      default: {
        size: 'md',
      },
      padding: {
        sm: 'px-4 py-1.5',
        md: 'px-4 py-2.5',
        lg: 'px-4 py-2.5',
        xl: 'px-4 py-2.5',
      },
      rounded: 'rounded-lg',
      font: 'font-bold font-lato',
      variant: {
        solid:
          'shadow-none text-white bg-{color}-600 hover:bg-{color}-500 disabled:bg-gray-300 disabled:text-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-{color}-500',
        outline:
          'shadow-none text-{color}-600 hover:bg-{color}-50 disabled:bg-transparent disabled:ring-gray-500 disabled:text-gray-500 focus-visible:ring-2 focus-visible:ring-{color}-500',
      },
    },
    input: {
      default: {
        size: 'md',
        color: 'white',
      },
      base: 'disabled:opacity-100',
      rounded: 'rounded-lg',
      placeholder: 'placeholder-gray-500',
      padding: {
        md: 'px-2 py-2.5',
      },
      color: {
        white: {
          outline:
            'shadow-none text-gray-800 ring-gray-300 focus:ring-primary-500 disabled:bg-gray-50',
        },
      },
      variant: {
        outline:
          'shadow-none text-gray-800 ring-{color}-500 focus:ring-{color}-500 disabled:bg-gray-50',
      },
    },
    table: {
      wrapper: 'border border-gray-300 rounded-lg',
      divide: 'divide-y divide-gray-300',
      thead: 'bg-primary-600',
      tbody: 'divide-y divide-gray-300',
      tr: {
        base: 'even:bg-gray-50',
      },
      th: {
        padding: 'px-3 py-3',
        color: 'text-white',
        font: 'font-semibold font-roboto',
      },
      td: {
        base: 'whitespace-normal',
        padding: 'px-3 py-3',
        color: 'text-gray-800',
        font: 'font-lato',
      },
      loadingState: {
        wrapper:
          'flex flex-col items-center justify-center flex-1 px-6 py-14 sm:px-14',
        label: 'text-sm text-center text-gray-900 dark:text-white',
        icon: 'w-6 h-6 mx-auto text-gray-400 dark:text-gray-500 mb-4 animate-spin',
      },
    },
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
