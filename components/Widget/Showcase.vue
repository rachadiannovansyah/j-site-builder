<template>
  <!-- Parent Modal: List Showcase -->
  <UModal
    :model-value="props.open"
    prevent-close
    :ui="{ width: 'md:max-w-[736px]' }"
  >
    <UCard
      :ui="{
        body: {
          padding: 'sm:pt-0 sm:pb-4 sm:px-8',
        },
        header: {
          padding: 'sm:py-4 sm:px-6',
        },
        footer: {
          background: 'bg-gray-50',
          padding: 'sm:py-4 sm:px-6',
        },
      }"
    >
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="font-roboto text-xl font-medium leading-8 text-green-800">
            Pengaturan Showcase
          </h3>
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-x-mark-20-solid"
            @click="$emit('close')"
          />
        </div>
        <div class="mt-4 flex justify-end">
          <UButton
            color="primary"
            variant="solid"
            label="Tambah"
            icon="i-heroicons-plus-20-solid"
            @click="isOpenAddShowcase = true"
          />
        </div>
      </template>

      <section
        class="flex h-[385px] w-[722px] flex-col items-center justify-center gap-x-3 gap-y-4 overflow-y-auto bg-[#F9F9F9] px-6 py-4 md:grid md:grid-cols-2 lg:grid-cols-3"
      >
        <!-- @todo: update list showcase -->
        <div
          v-for="item in 9"
          :key="item"
          class="relative flex h-[213px] w-[216px] flex-col items-center justify-center gap-4"
        >
          <div
            class="flex h-[173px] w-[216px] items-center justify-center rounded-lg bg-white"
          >
            <img
              src="/logos/logo.svg"
              alt="Portal Jabar Logo"
              width="72"
              height="78"
            />
          </div>
          <p class="font-roboto text-base font-medium text-gray-800">Item</p>
          <button class="absolute left-3 top-3">
            <NuxtIcon
              name="common/trash"
              aria-hidden="true"
              class="text-base text-red-700"
            />
          </button>
          <button class="absolute right-3 top-3">
            <NuxtIcon
              name="common/pencil"
              aria-hidden="true"
              class="text-base text-green-700"
            />
          </button>
        </div>
      </section>
    </UCard>

    <!-- Child Modal: Add Showcase -->
    <UModal
      :model-value="isOpenAddShowcase"
      prevent-close
      :ui="{ width: 'md:max-w-[799px]', height: 'md:max-h-750px' }"
      :overlay="false"
    >
      <UCard
        :ui="{
          body: {
            padding: 'sm:px-10 sm:py-3',
          },
          header: {
            padding: 'sm:py-4 sm:px-6',
          },
          footer: {
            background: 'bg-gray-50',
            padding: 'sm:py-4 sm:px-6',
          },
        }"
      >
        <template #header>
          <div class="flex items-center justify-between">
            <h3
              class="font-roboto text-xl font-medium leading-8 text-green-800"
            >
              Tambahkan Item
            </h3>
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-x-mark-20-solid"
              class="-my-1"
              @click="isOpenAddShowcase = false"
            />
          </div>
        </template>

        <section class="flex h-[606px] w-full flex-col gap-[10px]">
          <div
            class="custom-border-dash my-6 flex h-[206px] w-[719px] flex-col items-center justify-center gap-3 bg-gray-50"
          >
            <p class="font-lato text-sm font-medium text-blue-gray-800">
              drag and drop berkas disini atau
            </p>
            <div class="flex gap-[15px]">
              <button class="flex flex-col items-center justify-center gap-3">
                <img
                  src="~/assets/icons/common/select-media.svg"
                  alt="Ikon Pilih Media"
                  width="45"
                  height="45"
                />
                <p class="font-lato text-sm font-normal text-blue-500">
                  Pilih Media
                </p>
              </button>
              <button class="flex flex-col items-center justify-center gap-3">
                <img
                  src="~/assets/icons/common/select-logo.svg"
                  alt="Ikon Pilih Logo"
                  width="45"
                  height="45"
                />
                <p class="font-lato text-sm font-normal text-green-500">
                  Pilih Logo
                </p>
              </button>
            </div>
            <p class="mt-2 font-lato text-sm font-normal text-blue-gray-300">
              Ukuran Maksimal file upload 5 Mb dengan ratio 16:9.(.jpg dan.png )
            </p>
          </div>
          <UFormGroup label="Judul">
            <UInput
              v-model="state.title"
              placeholder="Masukkan judul"
              color="gray"
            />
          </UFormGroup>
          <UFormGroup label="Deskripsi">
            <UTextarea
              v-model="state.description"
              placeholder="Masukkan deskipsi"
              color="gray"
            />
            <p class="py-2 text-right font-lato text-xs text-gray-600">
              Tersisa <span class="text-gray-800">500</span> Karakter
            </p>
          </UFormGroup>
          <UFormGroup label="Link Redirect">
            <UToggle color="primary" :model-value="false" />
            <UInput
              v-model="state.link"
              placeholder="contoh: https://"
              color="gray"
            />
          </UFormGroup>
        </section>
        <template #footer>
          <section class="flex justify-between">
            <UButton
              variant="ghost"
              color="gray"
              @click="isOpenAddShowcase = false"
            >
              Batalkan
            </UButton>
            <UButton> Submit </UButton>
          </section>
        </template>
      </UCard>
    </UModal>
  </UModal>
</template>

<script setup lang="ts">
  const props = defineProps({
    open: {
      type: Boolean,
      default: false,
    },
  })

  const isOpenAddShowcase = ref(false)

  const state = reactive({
    title: '',
    description: '',
    link: '',
    isActiveLink: false,
  })

  defineEmits(['close'])
</script>

<style scoped>
  .custom-border-dash {
    background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='8' ry='8' stroke='silver' stroke-width='2' stroke-dasharray='8' stroke-dashoffset='5' stroke-linecap='square'/%3e%3c/svg%3e");
    border-radius: 8px;
  }
</style>
