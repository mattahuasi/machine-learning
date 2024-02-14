<script setup>
import { onMounted, ref, watch } from "vue";
import { toast } from "vue3-toastify";
import { getEntriesRequest } from "@/api/entry";
import CardData from "@/components/cards/CardData.vue";
import DataTable from "@/components/tables/DataTable.vue";
import Search from "@/components/inputs/Search.vue";

const items = ref([]);
const itemsDisplay = ref([]);
const searchQuery = ref("");
const init = ref(
  new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 10)
);
const final = ref(
  new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 10)
);
const columns = ref([
  { key: "id", label: "ID" },
  { key: "full_name", label: "Nombre completo" },
  { key: "ci", label: "CI" },
  { key: "role", label: "Rol" },
  { key: "turnstile", label: "Molinete" },
  { key: "createdAt", label: "Entrada", date: true },
]);
const options = ref([]);

async function loadData() {
  try {
    const res = await getEntriesRequest(init.value, final.value);
    items.value = res.data;
    itemsDisplay.value = items.value;
  } catch (error) {
    toast.error(
      "Se produjo un error al cargar los datos. Por favor, inténtalo de nuevo."
    );
  }
}

watch(searchQuery, () => {
  searchItems();
});
watch(init, () => {
  loadData();
});
watch(final, () => {
  loadData();
});

function searchItems(event) {
  const filteredItems = items.value.filter(
    (item) =>
      item.full_name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      item.role.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      item.ci.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
  itemsDisplay.value = filteredItems;
}

onMounted(() => {
  loadData();
});
</script>

<template>
  <card-data title="Entradas" icon="fa-sign-in-alt">
    <template v-slot:filters>
      <div class="flex flex-col justify-between md:flex-row gap-2">
        <Search v-model="searchQuery" />
        <div class="flex flex-row gap-2">
          <div class="relative mt-1">
            <label
              class="text-xs text-gray-600 absolute top-0 left-2 transform translate-y-[-110%]"
            >
              Fecha de inicio
            </label>
            <input
              id="items"
              v-model="init"
              class="block w-full text-sm text-gray-700 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
              name="items"
              type="date"
            />
          </div>
          <div class="relative mt-1">
            <label
              class="text-xs text-gray-600 absolute top-0 left-2 transform translate-y-[-110%]"
            >
              Fecha final
            </label>
            <input
              id="items"
              v-model="final"
              class="block w-full text-sm text-gray-700 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
              name="items"
              type="date"
            />
          </div>
        </div>
      </div>
    </template>
    <DataTable :columns="columns" :items="itemsDisplay" :options="options" />
  </card-data>
</template>
