<template>
<div class="modal modal-bg"
     :class="{ show: display }"
     >
  <modal v-if="display">

    <template slot="header">
      <h2 class="modal-title">Creation d'un evenement</h2>
      <md-button
        class="md-simple md-close md-just-icon md-round modal-default-button"
        @click="display = false"
        >
        <md-icon>clear</md-icon>
      </md-button>
    </template>

    <template slot="body">
      <form class="md-layout">
	
	<div class="md-layout-item">
	  <md-field>
	    <md-switch v-model="recurrentEvent">
              {{ recurrentEvent ? "Liste" : "Solo" }}
            </md-switch>
	  </md-field>
	</div>

	<div class="md-layout-item">
	  <md-field>
	    <label for="title">Nom du cours</label>
	    <md-input name="title"
		      id="title"
		      v-model="event.title"
		      />
	  </md-field>
	</div>

	<div class="md-layout-item">
	  <md-field>
	    <label for="color">Couleur</label>
	    <md-input name="color"
		      id="color"
		      type="color"
		      v-model="eventColor"
		      />
	  </md-field>
	</div>

	<div class="md-layout-item">
	  <md-field>
	    <label for="description">Description</label>
	    <md-input name="description"
		      id="description"
		      v-model="event.description"
		      />
	  </md-field>
	</div>

	<!-- First occurence -->
	<div class="md-layout-item">
	  <md-field>
	    <md-datepicker name="first"
			   id="first"
			   v-model="startDate"
			   md-immediately
			   >
	      <label for="first">Premier cours</label>
	    </md-datepicker>
	  </md-field>
	</div>

	<!-- Event duration in minutes -->
	<div class="md-layout-item">
	  <md-field>
	    <label for="duration">Durée (min)</label>
	    <md-input name="duration"
		      id="duration"
		      type="number"
		      v-model="event.duration"
		      />
	  </md-field>
	</div>

	<!-- End course -->
	<div class="md-layout-item"
	     v-if="recurrentEvent">
	  <md-field>
	    <md-datepicker name="first"
			   id="first"
			   v-model="startDate"
			   md-immediately
			   >
	      <label for="first">Last cours</label>
	    </md-datepicker>
	  </md-field>
	</div>

      </form>
    </template>

    <template slot="footer">
      <div class="md-layout">
      	<div class="md-layout-item md-alignment-center-right md-size-100">
	  <md-button v-on:click="onSubmit"
		     class="md-success md-round">
	    Créer
	  </md-button>
	</div>
	<div class="md-layout-item ">
	  <div class="container">
	    <span class="alert alert-danger"
		  v-if="error">
	      {{ error }}
	    </span>
	  </div>
	</div>
      </div>
    </template>

  </modal>
</div>



    <!-- div class="group">
      <list-adherents-left
	v-bind:users="usersIn"
	v-bind:dateFilter="dateFilter"
	v-bind:stringFilter="stringFilter"
	v-on:move-right="moveRight($event)"

	class="left"
	/>
      <list-adherents-right
	v-bind:users="usersOut"
	v-bind:dateFilter="dateFilter"
	v-bind:stringFilter="stringFilter"
	v-on:move-left="moveLeft($event)"
	
	class="left"
	/>

    </div -->


</template>

<script>
import ListAdherentsLeft from './ListAdherentsLeft';
import ListAdherentsRight from './ListAdherentsRight';
const tools = require('./tools');
const EventService = require('../services/EventService').service;
const userService = require('../services/UserService').service;

import Modal from "./Modal";

const util = require('util');

export default {
    name: 'new-course',
    data: function() {
	return {
	    event: {
		title: "",
		description: "",
		user_list: []
	    },
	    stringFilter: "",
	    dateFilter: 0,	   
	    usersIn: [
	    ],

	    usersOut: [
	    ],
	    frequency: [],
	    startDate: "",
	    startDateTime: "",
	    endDate: "",
	    weekFrequency: [
		{ value: 1, text: "Lundi"},
		{ value: 2, text: "Mardi"},
		{ value: 3, text: "Mercredi"},
		{ value: 4, text: "Jeudi"},
		{ value: 5, text: "Vendredi"},
		{ value: 6, text: "Samedi"},
		{ value: 0, text: "Dimanche"},
	    ],
	    eventColor: "#AADD55",
	    recurrentEvent: false,
	    error: "",
	    display: false

	}
    },
    props: {
	"events" : {
	    type: Array,
	    required: true
	}
    },
    methods: {
	onSubmit: async function() {
	    //if this is a single or recurrent event
	    if (this.recurrentEvent) {
		let freq = "";
		this.frequency.forEach((elt) => {
		    freq += elt + ",";
		});
		let _freq = "* * * * " + freq.substr(0, freq.length-1);
		this.event.frequency = _freq;
		this.event.endDate = tools.toJSDate(this.endDate, "23:59");
	    }
	    this.event.startDate = tools.toJSDate(this.startDate, this.startDateTime);
	    this.event.style = "background-color: "+this.eventColor;
	    this.addUsersInIDs(); //add users to user_list id of event

	    let result;
	    if (this.recurrentEvent) {
		result = await EventService.createCourse(this.event);
	    }
	    else {
		result = await EventService.createEvent(this.event);
	    }
	    console.log(result);
	    if (result.data.status === 0) {
		this.events.push(this.event);
	    }

	    tools.sendMessage(this.$store, result);
	    this.$refs.newCourseModal.hide();
	},
	addUsersInIDs: function() {
	    this.event.user_list = [];
	    this.usersIn.forEach((v) => {this.event.user_list.push(v._id)});
	},
	moveRight: function(userID) {
	    //move the user from UserIn to UserOut
	    tools.moveEltWithinArrays(this.usersIn, this.usersOut, userID);
	},
	moveLeft: function(userID) {
	    //move the user from UserOut to UserIn 
	    tools.moveEltWithinArrays(this.usersOut, this.usersIn, userID);
	},
	getAllAdherentsFromBack: async function() {	    
	    const res = await userService.getAllStudents();	    
	    this.usersOut = res.data.data;
	},
	show: function() {
	    this.display = true;
	}
	
    },
    components: {
	Modal,
	ListAdherentsLeft,
	ListAdherentsRight,
    },
    mounted: function() {
	this.getAllAdherentsFromBack();
    }
}
</script>
<style>
</style>
