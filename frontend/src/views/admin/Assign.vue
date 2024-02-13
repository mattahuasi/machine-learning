<script setup>
import { ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";
import { useProfileStore } from "@/stores/profile";
import {
  getEmployeesStaffRequest,
  getEmployeesAdminRequest,
  updateStatusEmployeeRequest,
  deleteEmployeeRequest,
} from "@/api/employee";
import { getRolesRequest } from "@/api/role";
import { disconnectCardEmployeeRequest } from "@/api/card";
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
  { key: "firstName", label: "Nombre/s" },
  { key: "lastName", label: "Apellidos" },
  { key: "ci", label: "CI" },
  { key: "role", label: "Rol" },
  { key: "status", label: "Habilitado", status: true },
]);
const options = ref([]);
// array de IDs de empleados
const arrayIds = ref([]);

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
    toast.error(
      "Se produjo un error al cargar los datos. Por favor, inténtalo de nuevo."
    );
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

// agregar IDs de empleados seleccionados al array
async function handleRowClick() {
  let id = 0;
  for (let i = 0; i < items.value.length; i++) {
    id = items.value[i].id;
    if (items.value[i].check) {
      if (!arrayIds.value.includes(id)) arrayIds.value.push(id);
    } else if (arrayIds.value.includes(id)) {
      const indexId = arrayIds.value.indexOf(id);
      arrayIds.value.splice(indexId, 1);
    }
  }
  console.table(arrayIds.value);
}

function searchItems(event) {
  const filteredItems = items.value.filter(
    (item) =>
      (item.first_name
        .toLowerCase()
        .includes(searchQuery.value.toLowerCase()) ||
        item.last_name
          .toLowerCase()
          .includes(searchQuery.value.toLowerCase()) ||
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
      toast.success("¡Estado de empleado cambiado exitosamente!");
    } catch (error) {
      toast.error(
        "Se produjo un error al intentar cambiar el estado del empleado. Por favor, inténtalo nuevamente."
      );
    }
  } else if (action.action === "delete") {
    try {
      await deleteEmployeeRequest(action.id);
      items.value = [];
      loadData();
      toast.success("¡Empleado eliminada exitosamente!");
    } catch (error) {
      toast.error(
        "Se produjo un error al intentar eliminar al empleado. Por favor, inténtalo nuevamente."
      );
    }
  } else if (action.action === "disconnect") {
    try {
      await disconnectCardEmployeeRequest(action.id);
      items.value = [];
      loadData();
      toast.success("¡Tarjeta desvinculada exitosamente!");
    } catch (error) {
      toast.error(
        "Se produjo un error al intentar desvincular la tarjeta. Por favor, inténtalo nuevamente."
      );
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
    toast.error(
      "Se produjo un error al cargar los datos. Por favor, inténtalo de nuevo."
    );
  }
});
</script>

<template>
  <card-data title="Empleados">
    <template v-slot:filters>
      <button-add to="/new/employees"> Agregar empleado </button-add>
    </template>
    <data-table :items="itemsDisplay" :columns="columns"> </data-table>
  </card-data>
</template>
