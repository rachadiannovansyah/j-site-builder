<template>
  <section class="flex min-w-0 items-center justify-center gap-2">
    <NuxtIcon
      name="common/filter"
      class="text-xl text-blue-gray-800"
      aria-hidden="true"
    />
    <p class="font-lato text-sm text-blue-gray-800">Filter :</p>
    <Button
      class="rounded-full bg-gray-300 px-4 py-[10px] font-lato text-sm text-gray-600"
      disabled
    >
      <div class="flex min-w-0 items-center justify-between gap-2">
        <p class="font-normal">Belum ada filter</p>
        <NuxtIcon
          name="common/chevron-down"
          class="text-lg"
          aria-hidden="true"
        />
      </div>
    </Button>
  </section>
</template>

<script></script>
