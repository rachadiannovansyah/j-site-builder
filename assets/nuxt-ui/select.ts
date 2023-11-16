export default {
  input: 'text-sm block w-fit mx-auto my-2 py-2.5 focus:ring-transparent rounded-lg border-2 focus:border-green-700 focus:outline-none focus:ring-transparent',
  background: 'bg-white',
  rounded: 'rounded-lg',
  color: 'focus:text-green-700',
  ring: "ring-1 ring-gray-200",
  default: {
    selectedIcon: 'none'
  },
  option: {
    base: 'font-lato hover:bg-gray-50 font-normal',
    size: 'text-sm',
    color: 'hover:text-green-700',
    rounded: 'rounded-md',
    padding: 'px-4',
    selected: 'text-green-700 font-bold',
    selectedIcon: {
      base: 'text-green-700',
    },
  }
}
