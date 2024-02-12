<script setup>
import { ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";
import { useProfileStore } from "@/stores/profile";
import { disconnectCardEmployeeRequest } from "@/api/card";
import {
  getEmployeesAdminRequest,
  getEmployeesStaffRequest,
  deleteEmployeeRequest,
  updateStatusEmployeeRequest,
} from "@/api/employee";
import { getRolesRequest } from "@/api/role";
import ButtonAdd from "@/components/buttons/ButtonAdd.vue";
import CardData from "@/components/cards/CardData.vue";
import DataTable from "@/components/tables/DataTable.vue";

const profileStore = useProfileStore();
const router = useRouter();
const items = ref([]);
const roles = ref([]);
const itemsDisplay = ref([]);
const searchQuery = ref("");
const inside = ref("all");
const role = ref("all");
const status = ref("all");
const load = ref(true);
const columns = ref([
  { key: "id", label: "ID" },
  { key: "firstName", label: "Nombres" },
  { key: "lastName", label: "Apellidos" },
  { key: "email", label: "Correo electrónico" },
  { key: "ci", label: "CI" },
  { key: "role", label: "Rol" },
  { key: "inside", label: "Presente", check: true },
  { key: "status", label: "Habilitado", status: true },
  { key: "card", label: "Tarjeta", color: true },
  { key: "createdAt", label: "Creado", date: true },
]);
const options = ref([
  {
    id: "update",
    name: "Actualizar",
    icon: "hi-solid-pencil",
  },
  {
    id: "changeStatus",
    name: "Cambiar estado de usuario",
    icon: "hi-solid-switch-horizontal",
  },
  {
    id: "connect",
    name: "Vincular tarjeta",
    icon: "hi-solid-status-online",
  },
  {
    id: "disconnect",
    name: "Desvincular tarjeta",
    icon: "hi-solid-status-offline",
  },
  {
    id: "delete",
    name: "Eliminar",
    icon: "hi-solid-exclamation",
  },
]);

async function loadData() {
  load.value = true;
  try {
    let res;
    if (profileStore.isAdmin) res = await getEmployeesAdminRequest();
    else res = await getEmployeesStaffRequest();
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
watch(inside, () => {
  searchItems();
});
watch(role, () => {
  searchItems();
});
watch(status, () => {
  searchItems();
});

function searchItems(event) {
  const filteredItems = items.value.filter(
    (item) =>
      (item.firstName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        item.lastName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        item.ci.toLowerCase().includes(searchQuery.value.toLowerCase())) &&
      (inside.value === "all" || item.inside.toString() === inside.value) &&
      (role.value === "all" || item.role === role.value) &&
      (status.value === "all" || item.status === status.value)
  );
  itemsDisplay.value = filteredItems;
}

async function action(action) {
  if (action.action === "update") {
    router.push({
      path: "/update/employees",
      query: { id: action.id },
    });
  } else if (action.action === "changeStatus") {
    try {
      await updateStatusEmployeeRequest(action.id);
      items.value = [];
      loadData();
      toast.success("Estado de empleado cambiado");
    } catch (error) {
      toast.error("Error al cambiar estado de empleado");
    }
  } else if (action.action === "delete") {
    try {
      await deleteEmployeeRequest(action.id);
      items.value = [];
      loadData();
      toast.success("Empleado eliminado");
    } catch (error) {
      toast.error("Error al eliminar empleado");
    }
  } else if (action.action === "disconnect") {
    try {
      await disconnectCardEmployeeRequest(action.id);
      items.value = [];
      loadData();
      toast.success("Tarjeta desvinculada");
    } catch (error) {
      toast.error("Error al desvincular tarjeta");
    }
  } else if (action.action === "connect") {
    try {
      router.push({
        path: "/connect/cards/employees",
        query: { id: action.id },
      });
    } catch (error) {
      console.log(error);
    }
  }
}

onMounted(async () => {
  loadData();
  try {
    const res = await getRolesRequest();
    roles.value = res.data;
  } catch (error) {
    toast.error("Error al cargar roles");
  }
});
</script>

<template>
  <card-data title="Empleados">
    <template v-slot:filters
      ><button-add to="/new/employees">Agregar empleado</button-add></template
    >
    <data-table :columns="columns" :items="itemsDisplay"></data-table
  ></card-data>
</template>
