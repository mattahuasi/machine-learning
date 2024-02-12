<script setup>
import { ref, computed } from "vue";
import { fullDateFormat } from "@/utils/dateFormatter";

const props = defineProps({
  columns: {
    type: Array,
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
});

const currentPage = ref(1);
const itemsPerPage = ref(5);
const totalPages = computed(() => {
  return Math.ceil(props.items.length / itemsPerPage.value);
});
const itemsDisplay = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return props.items.slice(start, end);
});
</script>

<template>
  <div class="py-4 overflow-x-auto">
    <div class="inline-block min-w-full overflow-hidden rounded-lg shadow">
      <table class="min-w-full leading-normal">
        <thead>
          <tr>
            <th
              v-for="column in columns"
              :key="column.key"
              class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200"
            >
              {{ column.label }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in itemsDisplay" :key="item.id">
            <td
              class="px-5 py-3 text-xs bg-white border-b border-gray-200"
              v-for="column in columns"
              :key="column.key"
            >
              <span v-if="column.check" class="flex justify-center">
                <span
                  class="rounded-full py-1 px-1"
                  :class="[
                    item[column.key] ? 'text-green-600' : 'text-red-600',
                  ]"
                >
                  <v-icon
                    :name="
                      item[column.key]
                        ? 'hi-solid-check-circle'
                        : 'hi-solid-x-circle'
                    "
                    scale="1.5"
                /></span>
              </span>
              <span v-else-if="column.color">
                <span
                  class="rounded-full py-1 px-3"
                  :style="{ backgroundColor: item[column.key] }"
                ></span>
              </span>
              <span v-else-if="column.date">
                {{ fullDateFormat(item[column.key]) }}
              </span>
              <span v-else-if="column.status" class="flex justify-center">
                <span
                  class="rounded-full py-1 px-1"
                  :class="[
                    item[column.key] == 1 ? 'text-green-600' : 'text-red-600',
                  ]"
                >
                  <v-icon
                    :name="
                      item[column.key] == 1
                        ? 'hi-solid-check-circle'
                        : 'hi-solid-x-circle'
                    "
                    scale="1.5"
                /></span>
              </span>
              <span v-else-if="column.image">Image</span>
              <span v-else>{{ item[column.key] }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div
    v-if="itemsDisplay.length === 0"
    class="w-full bg-gray-100 rounded-lg p-3"
  >
    <p class="text-gray-500 text-center">No hay datos para mostrar.</p>
  </div>
  <div
    v-else
    class="flex flex-col items-center px-5 py-5 bg-white border-t xs:flex-row xs:justify-between"
  >
    <span class="text-xs text-gray-900 xs:text-sm"
      >Página
      <span class="font-bold">{{ currentPage }}</span>
      de
      <span class="font-bold">{{ totalPages }}</span></span
    >
    <div class="inline-flex mt-2 xs:mt-0">
      <button
        class="px-4 py-2 text-sm font-semibold text-gray-800 bg-gray-300 rounded-l hover:bg-gray-400"
        @click="currentPage--"
        :disabled="currentPage === 1"
        type="button"
      >
        Anterior
      </button>
      <button
        class="px-4 py-2 text-sm font-semibold text-gray-800 bg-gray-300 rounded-r hover:bg-gray-400"
        @click="currentPage++"
        :disabled="currentPage === totalPages"
        type="button"
      >
        Siguiente
      </button>
    </div>
  </div>
</template>
