<script setup>
import { computed, reactive, ref } from "vue";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import CardData from "@/components/cards/CardData.vue";

const currentEvents = ref([]);
const calendarOptions = reactive({
  plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
  locale: "es",
  headerToolbar: {
    left: "prev,next today",
    center: "title",
  },
  initialView: "dayGridMonth",
  editable: false,
  selectable: true,
  selectMirror: true,
  dayMaxEvents: true,
  select: handleDateSelect,
  eventClick: handleEventClick,
  eventsSet: handleEvents,
  /* you can update a remote database when these fire:
  eventAdd:
  eventChange:
  eventRemove:
  */
});
const employees = ref([]);
const absenceTypes = ref([]);

const employeeData = computed(() => {
  return employees.value.map((employee) => {
    return {
      id: employee.id,
      fullName: `${employee.first_name} ${employee.last_name}`,
      role: employee.role,
      ci: employee.ci,
    };
  });
});

const formData = reactive({
  start: new Date(),
  end: new Date(),
  detail: "",
  absenceTypeId: 0,
  employeeId: 0,
});

function handleDateSelect(selectInfo) {
  show.value = true;
  /*let title = prompt("Please enter a new title for your event");
  let calendarApi = selectInfo.view.calendar;
  calendarApi.unselect(); // clear date selection
  if (title) {
    calendarApi.addEvent({
      id: createEventId(),
      title,
      start: selectInfo.startStr,
      end: selectInfo.endStr,
      allDay: selectInfo.allDay,
    });
  }*/
}

function handleEventClick(clickInfo) {
  if (
    confirm(
      `Are you sure you want to delete the event '${clickInfo.event.title}'`
    )
  ) {
    clickInfo.event.remove();
  }
}
function handleEvents(events) {
  currentEvents.val = events;
}
</script>

<template>
  <card-data title="Vacaciones">
    <template v-slot:filters> </template>
    <div class="demo-app">
      <div class="demo-app-main">
        <FullCalendar class="demo-app-calendar" :options="calendarOptions">
          <template v-slot:eventContent="arg">
            <b>{{ arg.timeText }}</b>
            <i>{{ arg.event.title }}</i>
          </template>
        </FullCalendar>
      </div>
    </div>
  </card-data>
</template>

<style lang="css">
.demo-app {
  display: flex;
  min-height: 100%;
  font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
  font-size: 14px;
}

.demo-app-sidebar-section {
  padding: 2em;
}

.demo-app-main {
  flex-grow: 1;
  padding: 3em;
}
</style>
