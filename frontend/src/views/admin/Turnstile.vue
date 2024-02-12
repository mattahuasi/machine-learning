<script setup>
import { ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";
import { getTurnstilesRequest } from "@/api/turnstile";
import DataTable from "@/components/tables/DataTable.vue";
import ButtonAdd from "@/components/buttons/ButtonAdd.vue";
import CardData from "@/components/cards/CardData.vue";

const router = useRouter();
const items = ref([]);
const itemsDisplay = ref([]);
const searchQuery = ref("");
const load = ref(true);
const columns = ref([
  { key: "id", label: "ID" },
  { key: "name", label: "Nombre" },
  { key: "description", label: "Descripción" },
  { key: "createdAt", label: "Creado", date: true },
]);
const options = ref([
  {
    id: "update",
    name: "Actualizar",
    icon: "hi-solid-pencil",
  },
]);

async function loadData() {
  load.value = true;
  try {
    const res = await getTurnstilesRequest();
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

function searchItems(event) {
  const filteredItems = items.value.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
  itemsDisplay.value = filteredItems;
}
async function action(action) {
  if (action.action === "update") {
    router.push({
      path: "/update/turnstiles",
      query: { id: action.id },
    });
  }
}

onMounted(() => {
  loadData();
});
</script>

<template>
  <card-data title="Molinetes">
    <template v-slot:filters>
      <button-add to="/new/turnstiles">Agregar Molinete</button-add>
    </template>
    <data-table :items="itemsDisplay" :columns="columns"> </data-table>
  </card-data>
</template>
