export default {
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
}
