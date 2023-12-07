<template>
  <div
    ref="search-bar"
    class="flex h-[38px] w-full items-center gap-3 rounded-lg border border-gray-200 px-3 py-2"
  >
    <NuxtIcon
      name="common/magnifier"
      class="flex-none text-base text-blue-gray-300"
      aria-hidden="true"
    />
    <form class="grow" @submit.prevent="onSubmit">
      <input
        ref="search-bar-input"
        v-model.trim="searchInputValue"
        type="text"
        :placeholder="placeholder"
        :data-cy="
          dataCySuffix
            ? `search-bar__input__${dataCySuffix}`
            : 'search-bar__input'
        "
        class="h-full w-full font-lato text-sm text-blue-gray-800 placeholder:text-blue-gray-200 focus:outline-none"
      />
    </form>
    <div class="w-3 flex-none items-center">
      <button
        v-show="hasValue"
        ref="search-bar-clear-button"
        :data-cy="
          dataCySuffix
            ? `search-bar__clear-button__${dataCySuffix}`
            : 'search-bar__clear-button'
        "
        @click="clearValue"
      >
        <div class="h-3 w-3 rounded-full bg-gray-500">
          <NuxtIcon
            name="common/close"
            class="text-xs text-white"
            aria-hidden="true"
          />
        </div>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
  defineProps({
    placeholder: {
      type: String,
      Number,
      default: 'default placeholder',
    },
    dataCySuffix: {
      type: String,
      default: '',
    },
  })

  const searchInputValue = ref('')
  const isSearchActive = ref(false)

  const hasValue = computed(() => {
    return searchInputValue.value !== ''
  })

  watch(searchInputValue, (value) => {
    if (isSearchActive && value.length >= 3) {
      isSearchActive.value = true
    }

    if (isSearchActive && value.length >= 3) {
      onInputChange(searchInputValue.value)
    }

    if (isSearchActive && value === '') {
      onInputChange('')
      isSearchActive.value = false
    }
  })

  const emit = defineEmits(['submit', 'input'])

  function clearValue() {
    searchInputValue.value = ''
  }

  function onSubmit() {
    emit('submit', searchInputValue.value)
  }

  function onInputChange(value: string) {
    setTimeout(() => {
      emit('input', value)
    }, 750)
  }
</script>
