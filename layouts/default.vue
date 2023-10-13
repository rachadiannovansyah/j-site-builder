<template>
  <div class="grid h-screen min-w-0 grid-cols-[260px,1fr] overflow-hidden">
    <TheSidebar />
    <main class="relative max-h-screen overflow-auto">
      <slot></slot>
    </main>
  </div>
</template>

<style>
  .nuxt-icon svg {
    @apply mb-0;
  }
</style>
