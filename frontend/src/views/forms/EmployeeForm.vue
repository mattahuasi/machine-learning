<script setup>
import { ref, onMounted, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useVuelidate } from "@vuelidate/core";
import { required, helpers, email } from "@vuelidate/validators";
import { toast } from "vue3-toastify";
import { createEmployeeRequest, getEmployeeRequest } from "@/api/employee";
import { getRolesRequest } from "@/api/role";
import { useProfileStore } from "@/stores/profile";
import Form from "@/components/cards/CardForm.vue";
import Input from "@/components/inputs/Input.vue";

const profileStore = useProfileStore();
const route = useRoute();
const router = useRouter();
const roles = ref([]);
const formData = reactive({
  firstName: "",
  lastName: "",
  ci: "",
  phone: "",
  address: "",
  email: "",
  roleId: "",
});
const rules = {
  firstName: {
    required: helpers.withMessage("Por favor, ingresa tu nombre", required),
  },
  lastName: {
    required: helpers.withMessage("Por favor, ingresa tu apellido", required),
  },
  ci: {
    required: helpers.withMessage(
      "Por favor, ingresa tu cédula de identidad",
      required
    ),
  },
  phone: {
    required: helpers.withMessage(
      "Por favor, ingresa tu número de teléfono o celular",
      required
    ),
  },
  address: {
    required: helpers.withMessage(
      "Por favor, ingresa la dirección tu domicilio",
      required
    ),
  },
  email: {
    email: helpers.withMessage(
      "Por favor, ingresa un correo electrónico válido",
      email
    ),
    required: helpers.withMessage(
      "Por favor, ingresa tu correo electrónico",
      required
    ),
  },
  password: {},
  roleId: {},
};
const v$ = useVuelidate(rules, formData);

async function handleSubmit() {
  const isFormCorrect = await v$.value.$validate();
  if (isFormCorrect) {
    try {
      formData.password = "holamundo";
      formData.roleId = "5";
      console.log(formData);
      const res = await createEmployeeRequest(formData);
      profileStore.user = res.data;
      toast.success("¡La información se ha actualizado correctamente!");
    } catch (error) {
      error.response.data.errors.map((item) => toast.error(item));
    }
  }
}

onMounted(async () => {
  try {
    const res = await getRolesRequest();
    roles.value = res.data;
  } catch (error) {
    toast.error("Error al cargar los datos");
  }
  if (route.query.id) {
    try {
      const res = await getEmployeeRequest(route.query.id);
      Object.assign(formData, res.data);
    } catch (error) {
      console.log(error);
      toast.error("Error al cargar los datos");
      router.push("/employees");
    }
  }
});
</script>

<template>
  <Form title="Información de usuario" @handle-submit="handleSubmit">
    <div
      class="w-32 h-32 mt-6 block overflow-hidden rounded-full shadow focus:outline-none"
    >
    </div>
    <div class="grid grid-cols-1 gap-6 mt-4 lg:grid-cols-2">
      <Input
        id="firstName"
        label-text="Nombres"
        v-model="v$.firstName.$model"
        :errors="v$.firstName.$errors"
        type="text"
      />
      <Input
        id="lastName"
        label-text="Apellidos"
        v-model="v$.lastName.$model"
        :errors="v$.lastName.$errors"
        type="text"
      />
      <Input
        id="email"
        label-text="Correo electrónico"
        v-model="v$.email.$model"
        :errors="v$.email.$errors"
        type="email"
      />
      <Input
        id="phone"
        label-text="Teléfono o celular"
        v-model="v$.phone.$model"
        :errors="v$.phone.$errors"
        type="text"
      />
      <Input
        id="address"
        label-text="Dirección domicilio"
        v-model="v$.address.$model"
        :errors="v$.address.$errors"
        type="text"
      />
    </div>
  </Form>
</template>
