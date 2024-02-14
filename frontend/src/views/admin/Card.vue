<script setup>
import { ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";
import {
  getCardsRequest,
  deleteCardRequest,
  disconnectCardRequest,
} from "@/api/card";
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
  { key: "type", label: "Tipo de tarjeta" },
  { key: "color", label: "Color", color: true },
  { key: "rfid", label: "Código RFID" },
  { key: "description", label: "Descripción" },
  { key: "userName", label: "Usuario" },
  { key: "connect", label: "Vinculada", check: true },
  { key: "createdAt", label: "Creado", date: true },
]);

const options = ref([
  {
    id: "update",
    name: "Actualizar",
    icon: "hi-solid-pencil",
  },
  {
    id: "delete",
    name: "Eliminar",
    icon: "hi-solid-exclamation",
  },
  {
    id: "disconnect",
    name: "Desvincular tarjeta",
    icon: "hi-solid-status-offline",
  },
]);

async function loadData() {
  load.value = true;
  try {
    const res = await getCardsRequest();
    items.value = res.data;
    itemsDisplay.value = items.value;
    load.value = false;
  } catch (error) {
    toast.error(
      "Se produjo un error al cargar los datos. Por favor, inténtalo de nuevo."
    );
  }
}

watch(searchQuery, () => {
  searchItems();
});

function searchItems(event) {
  const filteredItems = items.value.filter(
    (item) =>
      item.type.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
  itemsDisplay.value = filteredItems;
}

async function action(action) {
  if (action.action === "update") {
    router.push({
      path: "/update/cards",
      query: { id: action.id },
    });
  } else if (action.action === "delete") {
    try {
      await deleteCardRequest(action.id);
      items.value = [];
      loadData();
      toast.success("¡Tarjeta eliminada exitosamente!");
    } catch (error) {
      toast.error(
        "Se produjo un error al intentar eliminar la tarjeta. Por favor, inténtalo nuevamente."
      );
    }
  } else if (action.action === "disconnect") {
    try {
      await disconnectCardRequest(action.id);
      items.value = [];
      loadData();
      toast.success("¡Tarjeta desvinculada exitosamente!");
    } catch (error) {
      toast.error(
        "Se produjo un error al intentar desvincular la tarjeta. Por favor, inténtalo nuevamente."
      );
    }
  }
}

onMounted(() => {
  loadData();
});
</script>

<template>
  <card-data title="Tarjetas">
    <template v-slot:filters>
      <button-add to="/new/cards">Agregar tarjeta</button-add>
    </template>
    <DataTable
      :columns="columns"
      :items="itemsDisplay"
      :options="options"
      @action="action"
    />
  </card-data>
</template>
