<template>
  <div class="grid h-screen min-w-0 grid-cols-[260px,1fr]">
    <TheSidebar />
    <main class="relative max-h-screen overflow-auto">
      <slot></slot>
    </main>
  </div>
</template>
