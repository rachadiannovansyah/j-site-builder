<template>
  <UModal
    :model-value="props.open"
    prevent-close
    :ui="{ width: 'md:max-w-[799px]', height: 'md:max-h-750px' }"
    :overlay="false"
    as="div"
  >
    <UCard
      :ui="{
        body: {
          padding: 'sm:px-8 sm:py-3',
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
            {{ props.isEditMode ? 'Edit' : 'Tambahkan' }} Item
          </h3>
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-x-mark-20-solid"
            class="-my-1"
            @click="$emit('close')"
          />
        </div>
      </template>

      <section
        class="flex max-h-[606px] w-full flex-col gap-[10px] overflow-y-auto p-2"
      >
        <div
          class="custom-border-dash mb-2 flex h-[206px] w-[719px] items-center justify-center gap-3 bg-gray-50"
        >
          <div class="flex h-full w-full flex-col items-center justify-center">
            <p class="font-lato text-sm font-medium text-blue-gray-800">
              drag and drop berkas disini atau
            </p>
            <div class="flex gap-[15px]">
              <button class="flex flex-col items-center justify-center gap-3">
                <img
                  src="~/assets/icons/common/upload-picture.svg"
                  alt="Ikon Upload Gambar"
                  width="45"
                  height="45"
                />
                <p class="font-lato text-sm font-normal text-pink-600">
                  Upload Gambar
                </p>
              </button>
              <button
                class="flex flex-col items-center justify-center gap-3"
                @click="onOpenModalSelectLogo"
              >
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
              Ukuran Maksimal file upload 2 MB dengan ratio 1:1.(.jpg dan .png)
            </p>
          </div>
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
            :rows="4"
          />
          <p class="py-2 text-right font-lato text-xs text-gray-600">
            Tersisa <span class="text-gray-800">500</span> Karakter
          </p>
        </UFormGroup>
        <UFormGroup label="Link Redirect">
          <template #hint>
            <div class="flex w-full justify-between">
              <UToggle v-model="isActiveLink" color="primary" class="right-0" />
            </div>
          </template>
          <UInput
            v-model="state.link"
            :disabled="!isActiveLink"
            placeholder="contoh: https://"
            color="gray"
          />
        </UFormGroup>
      </section>
      <template #footer>
        <section class="flex justify-between">
          <UButton variant="ghost" color="gray" @click="$emit('close')">
            Batalkan
          </UButton>
          <UButton @click="onSubmitShowcase"> Submit </UButton>
        </section>
      </template>
    </UCard>

    <!-- Child Modal: Select Logo -->
    <WidgetShowcaseModalSelectLogo
      :open="isOpenModalSelectLogo"
      @close="toggleModalSelectLogo(false)"
      @select-logo="onSelectLogo"
    />
  </UModal>
</template>

<script setup lang="ts">
  import { ILogosData } from '~/repository/j-site/types/logo'
  const props = defineProps({
    open: {
      type: Boolean,
      default: false,
    },
    isEditMode: {
      type: Boolean,
      default: false,
    },
  })

  const state = reactive({
    file: {
      uri: '',
      id: '',
    },
    title: '',
    description: '',
    link: '',
  })
  const isActiveLink = ref(false)
  const isOpenModalSelectLogo = ref(false)

  const emit = defineEmits(['close', 'push-data'])

  function toggleModalSelectLogo(val: boolean) {
    isOpenModalSelectLogo.value = val
  }

  function onOpenModalSelectLogo() {
    toggleModalSelectLogo(true)
  }

  function onSelectLogo(logo: ILogosData) {
    state.title = logo.title || ''
    state.file.id = logo.file.id || ''
    state.file.uri = logo.file.uri || ''
  }

  function resetForm() {
    state.file.uri = ''
    state.file.id = ''
    state.title = ''
    state.description = ''
    state.link = ''
  }

  function onSubmitShowcase() {
    emit('push-data', toRaw(state))
    resetForm()
    emit('close')
  }

  watch(isActiveLink, (value) => {
    if (!value) {
      state.link = ''
    }
  })
</script>

<style scoped>
  .custom-border-dash {
    background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='8' ry='8' stroke='silver' stroke-width='2' stroke-dasharray='8' stroke-dashoffset='5' stroke-linecap='square'/%3e%3c/svg%3e");
    border-radius: 8px;
  }
</style>
