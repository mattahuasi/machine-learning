<script setup>
import { VueFinalModal } from "vue-final-modal";

const props = defineProps({
  title: {
    type: String,
    default: "Modal",
  },
});
const emit = defineEmits(
  {
    confirm: () => true,
  },
  {
    close: () => true,
  }
);
</script>

<template>
  <VueFinalModal
    v-model="show"
    class="flex justify-center items-center"
    content-class="flex flex-col max-w-xl mx-4 p-4 bg-white border  rounded-lg space-y-2 w-11/12 mx-auto overflow-y-auto bg-white rounded shadow-lg modal-container md:max-w-md"
  >
    <div class="px-6 py-4 text-left modal-content">
      <div class="flex items-center justify-between pb-3">
        <p class="text-2xl font-bold">{{ title }}</p>
        <div class="z-50 cursor-pointer modal-close" @click="emit('close')">
          <svg
            class="text-black fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 18 18"
          >
            <path
              d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"
            />
          </svg>
        </div>
      </div>
      <slot />
      <div class="flex justify-end pt-2">
        <button
          class="p-3 px-6 py-3 mr-2 text-indigo-500 bg-transparent rounded-lg hover:bg-gray-100 hover:text-indigo-400 focus:outline-none"
          @click="emit('close')"
          data-modal-hide="defaultModal"
          type="button"
        >
          Cancelar
        </button>
        <button
          class="px-6 py-3 font-medium tracking-wide text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none"
          @click="emit('confirm')"
          data-modal-hide="defaultModal"
          type="button"
        >
          Confirmar
        </button>
      </div>
    </div>
  </VueFinalModal>
</template>
