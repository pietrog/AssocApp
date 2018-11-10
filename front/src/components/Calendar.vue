<template>
<div id="child-view" class="group">
  <div id="toolbar-view">
    <button v-on:click="hideBox(false)">+</button>
  </div>
  <div id="main-view" class="calendar-container">
    <calendar-view
      :show-date="showDate"
      class="theme-default holiday-us-traditional holiday-us-official"
      v-bind:events="events"
      >
      <calendar-view-header slot="header" slot-scope="t" :header-props="t.headerProps" @input="setShowDate"/>
    </calendar-view>
  </div>
  <new-event v-bind:events="events" v-bind:class="{'hidden': hiddenBox}" v-on:hide-box="hideBox"/>
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
	    hiddenBox: true,
	    showDate: new Date(),
	    events: []
	}
    },
    methods: {
	setShowDate(d) {
	    this.showDate = d;
	},
	hideBox: function(hide) {
	    this.hiddenBox = hide;
	}

    }
}
</script>

<style scoped>

.calendar-container {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
}


</style>
