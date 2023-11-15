export default {
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
}
