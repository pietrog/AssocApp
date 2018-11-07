<template>
<div id="calendar" class="group">
  <div id="left-cal">
    Filters
  </div>
  <div id="right-cal">
    <calendar-view
      :show-date="showDate"
      class="theme-default holiday-us-traditional holiday-us-official"
      v-bind:events="events"
      >
      <calendar-view-header slot="header" slot-scope="t" :header-props="t.headerProps" @input="setShowDate"/>
    </calendar-view>
  </div>
  <new-event v-bind:events="events"/>
</div>
</template>

<script>
import NewEvent from './NewEvent';
import VueSimpleCalendar from 'vue-simple-calendar';
require("vue-simple-calendar/static/css/default.css");
require("vue-simple-calendar/static/css/holidays-us.css");

export default {
    name: 'calendar',
    components: {
	VueSimpleCalendar,
	NewEvent
    },
    data: function() {
	return {
	    showDate: new Date(),
	    events:  
	    [
		{
		    startDate: "2018-11-08 00:00:00",
		    endDate: "2018-11-09 12:00:00",
		    title: "test",
		    id: "sdkjhvliuzehv"
		},
		{
		    startDate: "2018-11-11 13:00:00",
		    endDate: "2018-11-11 18:00:00",
		    title: "test2",
		    id: "sdkjhvliuzehv"
		}
	    ]
	}
    },
    methods: {
	setShowDate(d) {
	    this.showDate = d;
	},
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
