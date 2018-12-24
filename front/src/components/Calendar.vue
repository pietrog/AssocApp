<template>
<div id="child-view" class="group">
    <button class="fixed-button" v-on:click="hideBoxCourse(false)">+</button>
    <select v-model="displayPeriodUom">
      <option value="week">Semaine</option>
      <option value="month">Mois</option>
      <option value="year">Année</option>
    </select>
    <div id="main-view" class="calendar-container">
      <calendar-view
	:show-date="showDate"
	class="theme-default holiday-fr-traditional holiday-fr-official"
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
    <new-course
      v-if="hiddenBoxCourse === false"
      v-bind:events="events"
      v-on:hide-box="hideBoxCourse"
      :messages="messages"
      />
    <event-details
      v-if="event"
      v-bind:event="event"
      v-on:hide-event-details="hideEventDetails"
      :messages="messages"
      />
</div>
</template>

<script>
import NewCourse from './NewCourse';
import VueSimpleCalendar from 'vue-simple-calendar';
import EventDetails from './EventDetails';
require("vue-simple-calendar/static/css/default.css");
require("vue-simple-calendar/static/css/holidays-us.css");
let util = require('util');

const EventService = require('./EventService').service;

export default {
    name: 'calendar',
    components: {
	VueSimpleCalendar,
	NewCourse,
	EventDetails
    },
    data: function() {
	return {
	    hiddenBoxCourse: true,
	    showDate: new Date(),
	    enableDragAndDrop: true,
	    showEventTimes: false,
	    displayPeriodUom: "month",
	    displayPeriodCount: 1,
	    event: null,
	    events: []
	}
    },
    methods: {
	setShowDate: function(d) {
	    this.showDate = d;
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
    },
    props: {
	'messages': Array
    },

    mounted: async function() {
	const result = await EventService.getAllEvents();
	this.events = result.data.data;
	this.events.forEach((elt) => {
	    elt.title = elt.name;
	    elt.startDate = new Date(elt.begin_date);
	    elt.endDate = new Date(elt.end_date);
	});
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
