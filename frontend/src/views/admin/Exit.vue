<script setup>
import { ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";
import { getExitsRequest } from "@/api/entry";
import DataTable from "@/components/tables/DataTable.vue";
import CardData from "@/components/cards/CardData.vue";

const router = useRouter();
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
const load = ref(true);
const columns = ref([
  { key: "id", label: "ID" },
  { key: "full_name", label: "Nombre completo" },
  { key: "ci", label: "CI" },
  { key: "role", label: "Rol" },
  { key: "turnstile", label: "Molinete" },
  { key: "createdAt", label: "Salida", date: true },
]);
const options = ref([]);

async function loadData() {
  load.value = true;
  try {
    const res = await getExitsRequest(init.value, final.value);
    items.value = res.data;
    itemsDisplay.value = items.value;
    load.value = false;
  } catch (error) {
    toast.error("Error al cargar datos");
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
  <card-data title="Salidas">
    <template v-slot:filters> </template>
    <data-table :items="itemsDisplay" :columns="columns"> </data-table>
  </card-data>
</template>
