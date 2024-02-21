<script setup>
import "v-calendar/style.css";
import { ref } from "vue";
import { Calendar, DatePicker } from "v-calendar";
import { useScreens } from "vue-screen-utils";
import CardData from "@/components/cards/CardData.vue";

const date = ref(new Date());
const { mapCurrent } = useScreens({
  xs: "0px",
  sm: "640px",
  md: "768px",
  lg: "1024px",
});
const columns = mapCurrent({ lg: 1 }, 1);
const expanded = mapCurrent({ lg: true }, true);

const attrs = ref([
  {
    highlight: true,
    dates: new Date(),
  },
]);
const calendar = ref(null);

function moveToday() {
  calendar.value.move(new Date());
}
</script>

<template>
  <card-data title="Vacaciones">
    <template v-slot:filters> </template>
    <div>
      <DatePicker
        v-model="date"
        mode="dateTime"
        ref="calendar"
        color="blue"
        show-weeknumbers
        trim-weeks
        :attributes="attrs"
        :columns="columns"
        :expanded="expanded"
      >
        <template #footer>
          <div class="w-full px-4 pb-3">
            <button
              class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold w-full px-3 py-1 rounded-md"
              @click="moveToday"
            >
              Today
            </button>
          </div>
        </template>
      </DatePicker>
    </div>
  </card-data>
</template>
