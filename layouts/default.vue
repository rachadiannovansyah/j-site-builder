<template>
  <div
    class="relative grid h-screen min-w-0 grid-cols-[260px,1fr] overflow-hidden"
  >
    <TheSidebar />
    <div class="w-full max-w-[calc(100vw-260px)]">
      <TheHeader />
      <main
        class="h-[calc(100vh-72px)] w-full overflow-y-auto bg-gray-100 px-6 py-[14px]"
      >
        <slot />
      </main>
    </div>
  </div>
</template>

<style>
  .nuxt-icon svg {
    @apply mb-0;
  }
</style>
