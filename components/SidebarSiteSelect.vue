<template>
  <Listbox v-model="siteId" as="div">
    <div class="relative">
      <ListboxButton
        class="relative grid w-[212px] cursor-default grid-cols-[20px,1fr,20px] items-center gap-x-3 rounded-md bg-[#35B472] px-4 py-3 text-left font-lato text-sm text-white"
        data-cy="j-site-sidebar__button-site-select"
      >
        <NuxtIcon
          name="common/globe"
          class="text-xl"
          filled
          aria-hidden="true"
        />
        <div class="flex min-w-0 flex-col">
          <span class="text-xxs leading-none">Situs saya</span>
          <span class="line-clamp-2 text-sm font-bold">
            {{ siteName }}
          </span>
        </div>
        <NuxtIcon
          name="common/chevron-down"
          class="pointer-events-none absolute right-0 pr-3 text-xl"
          filled
          aria-hidden="true"
        />
      </ListboxButton>

      <transition
        leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <ListboxOptions
          class="site-select__option-container absolute z-10 mt-1 max-h-56 w-[212px] overflow-y-auto overflow-x-hidden rounded-md bg-[#35B472] py-1 font-lato text-sm font-normal text-white shadow-lg"
        >
          <ListboxOption
            v-for="site in sites"
            :key="site.id"
            v-slot="{ selected }"
            as="template"
            :value="site.id"
          >
            <li
              class="relative cursor-pointer select-none py-2 pl-3 pr-9 hover:bg-green-600"
            >
              <div class="flex items-center">
                <span class="ml-3 line-clamp-3 break-words pr-1">
                  {{ site.name }}
                </span>
                <NuxtIcon
                  v-show="selected"
                  name="common/check-circle"
                  class="absolute inset-y-0 right-0 flex items-center pr-4 text-xl"
                  filled
                  aria-hidden="true"
                />
              </div>
            </li>
          </ListboxOption>
          <div class="mt-2 flex justify-center border-t border-[#5BC08B] py-3">
            <NuxtLink
              :to="`${config.public.portalJabarCMSBaseURL}/j-site`"
              class="inline-flex"
              data-cy="j-site-sidebar__button-site-manage"
            >
              <NuxtIcon
                name="navigation/account-settings-icon"
                class="mr-2 text-lg"
                filled
                aria-hidden="true"
              />
              <span class="font-bold">Kelola J-Site</span>
            </NuxtLink>
          </div>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</template>

<script setup>
  import {
    Listbox,
    ListboxButton,
    ListboxOption,
    ListboxOptions,
  } from '@headlessui/vue'

  const siteStore = useSiteStore()
  const config = useRuntimeConfig()

  const sites = computed(() => siteStore.sites)

  const siteId = computed({
    get() {
      return siteStore.siteId
    },
    set(id) {
      siteStore.setSiteId(id)
    },
  })

  const siteName = computed(() => siteStore.siteName)
</script>

<style scoped>
  .site-select__option-container::-webkit-scrollbar {
    width: 4px;
  }

  .site-select__option-container::-webkit-scrollbar-track {
    background-color: none;
  }

  .site-select__option-container::-webkit-scrollbar-thumb {
    background-color: #9bdbb3;
    outline: none;
    border-radius: 6px;
    background-clip: padding-box;
  }
</style>
