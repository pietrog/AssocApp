<template>
<div id="child-view" class="group">
  <div id="toolbar-view">
    <button v-on:click="hideBoxEvent(false)">+</button>
    <button v-on:click="hideBoxCourse(false)">++</button>
    <select v-model="displayPeriodUom">
      <option value="week">Semaine</option>
      <option value="month">Mois</option>
      <option value="year">Année</option>
    </select>
  </div>
  <div id="main-view" class="calendar-container">
    <calendar-view
      :show-date="showDate"
      class="theme-default holiday-us-traditional holiday-us-official"
      v-bind:events="events"
      v-bind:displayPeriodUom="displayPeriodUom"
      v-bind:displayPeriodCount="displayPeriodCount"
      v-bind:enableDragDrop="enableDragAndDrop"
      v-bind:showEventTimes="showEventTimes"
      v-on:click-event="clickEvent"
      v-on:drop-on-date="dropOnDate"
      >
      <calendar-view-header slot="header" slot-scope="t" :header-props="t.headerProps" @input="setShowDate"/>
    </calendar-view>
  </div>
  <new-event v-bind:events="events" v-if="hiddenBoxEvent === false" v-on:hide-box="hideBoxEvent"/>
  <new-course v-bind:events="events" v-if="hiddenBoxCourse === false" v-on:hide-box="hideBoxCourse"/>
  <event-details
    v-if="event"
    v-bind:event="event"
    v-on:hide-event-details="hideEventDetails"
    />
</div>
</template>

<script>
import NewEvent from './NewEvent';
import NewCourse from './NewCourse';
import VueSimpleCalendar from 'vue-simple-calendar';
import EventDetails from './EventDetails';
require("vue-simple-calendar/static/css/default.css");
require("vue-simple-calendar/static/css/holidays-us.css");
let util = require('util');

export default {
    name: 'calendar',
    components: {
	VueSimpleCalendar,
	NewEvent,
	NewCourse,
	EventDetails
    },
    data: function() {
	return {
	    hiddenBoxEvent: true,
	    hiddenBoxCourse: true,
	    showDate: new Date(),
	    enableDragAndDrop: true,
	    showEventTimes: false,
	    displayPeriodUom: "month",
	    displayPeriodCount: 1,
	    event: null,
	    events: [
		{
		    title: "test",
		    startDate: new Date(2018, 10, 20, 10, 45),
		    endDate: new Date(2018, 10, 20, 12),
		    
		}
	    ]
	}
    },
    methods: {
	setShowDate: function(d) {
	    this.showDate = d;
	},
	hideBoxEvent: function(hide) {
	    this.hiddenBoxEvent = hide;
	},
	hideBoxCourse: function(hide) {
	    this.hiddenBoxCourse = hide;
	},
	updateEvent: function(event) {
	    //send update to server !
	},
	changeDisplayPeriod: function(option) {
	    alert('option: ' +option);
	    if (option === 0) this.displayPeriodUom = "week"
	    if (option === 1) this.displayPeriodUom = "month"
	    if (option === 2) this.displayPeriodUom = "year"
	},
	dropOnDate: function(event, date) {
	    event.originalEvent.startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), event.startDate.getHours(), event.startDate.getMinutes());
	    event.originalEvent.endDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), event.endDate.getHours(), event.endDate.getMinutes());
	    this.updateEvent(event.originalEvent);
	},
	clickEvent: function(event) {
	    this.event = event.originalEvent;
	},
	hideEventDetails: function() {
	    this.event = null;
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
