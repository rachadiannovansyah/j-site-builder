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
      base: 'disabled:opacity-100 font-lato',
      rounded: 'rounded-lg',
      placeholder: 'placeholder-gray-600',
      padding: {
        md: 'px-2 py-2.5',
      },
      color: {
        white: {
          outline:
            'shadow-none bg-[#FDFDFD] text-gray-800 ring-gray-400 focus:ring-primary-500 disabled:bg-gray-100 disabled:text-gray-400',
        },
      },
      variant: {
        outline:
          'shadow-none text-gray-800 ring-{color}-500 focus:ring-{color}-500 disabled:bg-gray-100',
      },
    },
    formGroup: {
      label: {
        base: 'block font-medium font-lato text-[0.9375rem] leading-6 text-gray-800',
      },
      description: 'text-gray-700 font-lato text-[0.8125rem] leading-6',
      error: 'mt-1 font-lato text-red-700 text-[0.8125rem] leading-6',
      default: {
        size: 'md',
      },
    },
    table: {
      default: {
        sortButton: {
          color: 'primary',
        },
      },
      wrapper: 'border border-gray-300 rounded-lg',
      divide: 'divide-y divide-gray-300',
      thead: 'bg-green-600',
      tbody: 'divide-y divide-gray-300',
      tr: {
        base: 'even:bg-gray-50',
      },
      th: {
        padding: 'px-3 py-3',
        color: 'text-white',
        font: 'font-bold font-roboto text-sm leading-6',
      },
      td: {
        base: 'whitespace-normal',
        padding: 'px-3 py-3',
        color: 'text-gray-800',
        font: 'font-lato text-sm leading-6',
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
    card: {
      divide: 'divide-y-0',
      body: {
        padding: 'sm:py-4 sm:px-6',
      },
      header: {
        padding: 'sm:py-2 sm:px-6',
      },
      footer: {
        background: 'bg-gray-50',
        padding: 'sm:py-4 sm:px-6',
      },
    },
    alert: {
      default: {
        color: 'blue',
        variant: 'subtle',
        icon: 'i-heroicons-information-circle-20-solid',
      },
      variant: {
        subtle: 'bg-{color}-50 text-{color}-800 ring-{color}-800',
      },
    },
  },
})
