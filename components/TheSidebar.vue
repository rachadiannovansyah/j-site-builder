<template>
  <aside
    data-cy="sidebar__container"
    class="sidebar flex min-h-screen flex-col bg-green-600 p-6"
  >
    <section ref="sidebar-title" data-cy="sidebar__header" class="flex gap-2">
      <img
        src="/logos/logo.svg"
        alt="Portal Jabar Logo"
        width="34px"
        height="34px"
        class="self-start"
      />
      <div>
        <img
          src="/logos/logo-text.svg"
          alt="Portal Jabar Logo"
          width="75px"
          height="38px"
          class="mb-1"
        />
        <h1
          data-cy="sidebar__header-title"
          class="font-lato whitespace-nowrap text-sm font-bold leading-5 text-white"
        >
          CONTENT MANAGEMENT<br />
          SYSTEM
        </h1>
      </div>
    </section>
    <nav>
      <ul data-cy="sidebar__navigation" class="mt-10 w-full">
        <li>
          <NuxtLink
            v-for="navigation in NAVIGATION_MENU"
            :key="navigation.label"
            :to="navigation.link"
            class="sidebar__navigation-item font-lato mb-2 flex min-h-[50px] w-full items-center rounded-lg p-[15px] text-sm font-bold text-white hover:bg-green-700"
          >
            <NuxtIcon :name="navigation.icon" filled class="text-xl" />
            <span class="ml-3">{{ navigation.label }}</span>
          </NuxtLink>
        </li>
      </ul>
    </nav>
    <section class="mt-auto">
      <ul ref="sidebar-bottom-nav" data-cy="sidebar__bottom-nav">
        <li>
          <NuxtLink
            to="/"
            class="font-lato mb-2 flex min-h-[50px] w-full items-center rounded-lg p-[15px] text-sm font-bold text-white hover:bg-green-700"
          >
            <NuxtIcon
              name="navigation/portal-cms-icon"
              filled
              class="text-xl"
            />
            <span class="ml-3">CMS Portal Jabar</span>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink
            to="/"
            class="font-lato mb-2 flex min-h-[50px] w-full items-center rounded-lg p-[15px] text-sm font-bold text-white hover:bg-green-700"
          >
            <NuxtIcon
              name="navigation/account-settings-icon"
              filled
              class="text-xl"
            />
            <span class="ml-3">Pengaturan Akun</span>
          </NuxtLink>
        </li>
      </ul>
    </section>
  </aside>
</template>

<script setup lang="ts">
  import { NAVIGATION_MENU } from '~/common/constant/navigation'
</script>

<style>
  .sidebar__navigation-item.router-link-exact-active {
    @apply bg-green-700;
  }

  .nuxt-icon svg {
    @apply mb-0;
  }
</style>
