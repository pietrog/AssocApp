<template>
<div id="calendar">
  <calendar-view
    :show-date="showDate"
    class="theme-default holiday-us-traditional holiday-us-official"
    >
    <calendar-view-header />
  </calendar-view>
</div>
</template>

<script>
import VueSimpleCalendar from 'vue-simple-calendar';
//require("vue-simple-calendar/static/css/default.css");
//require("vue-simple-calendar/static/css/holidays-us.css");

export default {
    name: 'calendar',
    components: {
	VueSimpleCalendar
    }
}
</script>

<style scoped>
#calendar {
    float: left;
    background-color: #eaeaed;
    width: 98%;

    display: flex;
    flex-direction: column;
    flex-grow: 1;
}



</style>
