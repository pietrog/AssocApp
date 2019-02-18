<template>
<b-modal ref="newCourseModal" hide-footer
	 title="Création d'un évènement">
  <b-form @submit="onSubmit">

    <!-- switch between single and multi events -->
    <b-form-group horizontal
		  label="Récurrent"
		  label-class="font-weight-bold pt-0"
		  >
      <b-form-checkbox v-model="recurrentEvent" />
    </b-form-group>

    <!-- Event title -->
    <b-form-group horizontal
		  label="Nom du cours"
		  label-class="font-weight-bold pt-0"
		  >
      <b-form-input type="text"
		    required
		    v-model="event.title"
		    placeholder="Entrer le nom du cours">	
      </b-form-input>
    </b-form-group>

    <!-- Event color in calendar -->
    <b-form-group horizontal
		  label="Couleur de l'évènement"
		  label-class="font-weight-bold pt-0"
		  >
      <b-form-input type="color"
		    required		    
		    v-model="eventColor" >	
      </b-form-input>
    </b-form-group>

    <!-- Event description -->
    <b-form-group horizontal
		  label="Description"
		  label-class="font-weight-bold pt-0"
		  >
      <b-form-textarea required		    
		       v-model="event.description"
		       :rows="3"
		       placeholder="Entrez la description"
		       >	
      </b-form-textarea>
    </b-form-group>

    <!-- First occurence -->
    <b-card bg-variant="light">
      <b-form-group label="Premier cours"
		    label-class="font-weight-bold pt-0"
		    >
	
	<b-form-group horizontal
		      label-for="nestedDate"		    
		      label="Date: ">
	  <b-form-input id="nestedDate"
			type="date"
			required		    
			v-model="startDate" >		    
	  </b-form-input>
	</b-form-group>
	
	<b-form-group horizontal
		      label-for="nestedTime"		    
		      label="Heure: ">	
	  <b-form-input id="nestedTime"
			type="time"
			required		    
			v-model="startDateTime"
			placeholder="Entrer l'heure">	
	  </b-form-input>
	</b-form-group>
	
      </b-form-group>
    </b-card>

    <!-- Event duration in minutes -->
    <b-form-group horizontal
		  label="Durée (min)"
		  label-class="font-weight-bold pt-0"
		  >
      <b-form-input type="number"
		    required		    
		    v-model="event.duration" >	
      </b-form-input>
    </b-form-group>

    

    <!-- End course -->
    <b-card v-if="recurrentEvent"
	    bg-variant="light">


      <b-form-group label="Paramétrage de la récurrence"
		    label-class="font-weight-bold pt-0"
		    >

	<!-- select the frequency -->
	<b-form-group horizontal
		      label="Tous les:"
		      label-for="nestedFreq"
		      >
	  <b-form-select id="nestedFreq"
			 multiple
			 :options="weekFrequency"
			 v-model="frequency" />
	</b-form-group>
	
	<!-- last course date -->	
	<b-form-group horizontal
		      label="Jusqu'au:"
		      label-for="nestedLastDate"
		      >
	  <b-form-input id="nestedLastDate"
			type="date"
			required		    
			v-model="endDate"
			placeholder="Entrer la date du dernier cours">	
	  </b-form-input>
	</b-form-group>
	
      </b-form-group>
    </b-card>
    
    <b-button type="submit">Créer</b-button>

  </b-form>
</b-modal>



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
	    recurrentEvent: false

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
	    this.$refs.newCourseModal.show();
	}
	
    },
    components: {
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
