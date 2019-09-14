<template>
<div class="wrapper">
  <parallax
    class="page-header header-filter clear-filter back-img"
    parallax-active="true"
    :style="headerStyle"
    >
    <div class="md-layout">
      <div class="md-layout-item">
        <div class="image-wrapper">
          <div class="brand">
            <h1>
              Taekwondo
            </h1>
            <span class="pro-badge">
              COMB
            </span>
          </div>
        </div>
      </div>
    </div>
  </parallax>

  <div class="section">
    <div class="container">

      <md-button class="md-fab md-fab-top-right md-round md-danger"
		 v-on:click="showNewCourseModal"
		 >
	<md-icon>Nouveau cours</md-icon>
      </md-button>

      <div class="main">
	<div class="md-layout">
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
	    <calendar-view-header slot="header"
				  slot-scope="t"
				  :header-props="t.headerProps"
				  @input="setShowDate"/>
	  </calendar-view>

	</div>
      </div>
    </div>
  </div>

  <new-course ref="newCourse"
	      v-bind:events="events" />
  <event-details ref="eventDetails"
		 v-bind:event="event"		 
		 />

</div>
</template>

<script>
import NewCourse from './NewCourse';
import {CalendarView, CalendarViewHeader} from 'vue-simple-calendar';
import EventDetails from './EventDetails';
require("vue-simple-calendar/static/css/default.css");
require("vue-simple-calendar/static/css/holidays-us.css");
let util = require('util');

const EventService = require('../services/EventService').service;

export default {
    name: 'calendar',
    components: {
	CalendarView,
	CalendarViewHeader,
	NewCourse,
	EventDetails
    },
    data: function() {
	return {
	    showDate: new Date(),
	    enableDragAndDrop: true,
	    showEventTimes: false,
	    displayPeriodUom: "month",
	    displayPeriodCount: 1,
	    options: [
		{ value: "week", text: "Semaine"},
		{ value: "month", text: "Mois"},
		{ value: "year", text: "Année"}
	    ],
	    event: {
		startDate: new Date(Date.now()),
		endDate: new Date(Date.now())
	    },
	    events: []
	}
    },
    methods: {
	setShowDate: function(d) {
	    this.showDate = d;
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
	    //this.event = event.originalEvent;
	    this.$refs.eventDetails.show(event.originalEvent);
	},
	showNewCourseModal: function() {
	    this.$refs.newCourse.show();
	},

    },

    props: {
	  image: {
	      type: String,
	      default: require("@/assets/img/back-taek-dojo-2.jpg")
	  }
	  
      },

    mounted: async function() {
	try {
	    const result = await EventService.getAllEvents();
	    this.events = result.data.data;
	    if (this.events.lenght > 0) this.event = this.events[0];
	    this.events.forEach((elt) => {
		elt.title = elt.name;
		elt.startDate = new Date(elt.begin_date);
		elt.endDate = new Date(elt.end_date);
	    });	   
	}
	catch (err) {
	    this.$router.replace('Login');	    
	}
    },

    computed: {
	headerStyle() {
	    return {
		backgroundImage: `url(${this.image})`
	    };
	}
    },
    
    
}
</script>

<style>
.calendar-container {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    min-height: 800px;
}
</style>
