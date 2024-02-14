import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import { OhVueIcon, addIcons } from "oh-vue-icons";
import Vue3Toasity from "vue3-toastify";
import "vue3-toastify/dist/index.css";

import App from "./App.vue";
import router from "./router";
import * as HiIcons from "oh-vue-icons/icons/hi";

const Hi = Object.values({ ...HiIcons });
addIcons(...Hi);

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(Vue3Toasity, {
  autoClose: 5000,
});
app.component("v-icon", OhVueIcon);

app.mount("#app");
