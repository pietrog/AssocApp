<template>
<div id="calendar" class="group">
  <div id="left-cal">
    Filters
  </div>
  <div id="right-cal">
    <calendar-view
      :show-date="showDate"
      class="theme-default holiday-us-traditional holiday-us-official"
      v-bind:events="eevents"
      >
      <calendar-view-header />
    </calendar-view>
  </div>
</div>
</template>

<script>
import VueSimpleCalendar from 'vue-simple-calendar';
require("vue-simple-calendar/static/css/default.css");
require("vue-simple-calendar/static/css/holidays-us.css");

export default {
    name: 'calendar',
    components: {
	VueSimpleCalendar
    },
    data: function() {
	return {
	    showDate: new Date(),
	    eevents:  
	    [
		{
		    startDate: "2018-11-08 00:00:00",
		    endDate: "2018-11-09 12:00:00",
		    title: "test",
		    id: "sdkjhvliuzehv"
		}
	    ]
	}
    }
}
</script>

<style scoped>
#calendar {
    left: 0;
    right: 0;

}

#left-cal {
    float: left;
    width: 19%;
}

#right-cal {
    float: left;
    width: 78%;

    display: flex;
    flex-direction: column;
    flex-grow: 1;
}


</style>
