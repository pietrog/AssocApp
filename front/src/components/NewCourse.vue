<template>
<div id="back-popup-box" v-on:click="$emit('hide-box', true)">
  <div id="popup-box" v-on:click.stop="">
    Nouveau cours
    <table>
      <tr>
	<td>Nom du cours</td>
	<td><input v-model="event.title" /></td>
      </tr>
      <tr>
	<td>Color</td>
	<td>
	  <select v-model="eventColor">
	    <option value="red">red</option>
	    <option value="grey">grey</option>
	    <option value="blue">blue</option>
	  </select>
	</td>
      </tr>
      <tr>
	<td>Description</td>
	<td><textarea type="text" v-model="event.description" /></td>
      </tr>
      <tr>
	<td>Premier cours</td>
	<td><input v-model="startDate" type="date"/>-<input v-model="startDateTime" type="time"/></td>
      </tr>
      <input type="checkbox" v-model="recurrentEvent">Récurrent</input>
      <tr v-if="recurrentEvent">
	<td>Date de fin</td>
	<td><input v-model="endDate" type="date"/>-<input v-model="endDateTime" type="time"/></td>
      </tr>    
      <tr v-if="recurrentEvent">
	<td>Occurence</td>
	<td>
	  Tous les 
	  <select multiple="true" class="days" v-model="frequency">
	    <option value="1">lundis</option>
	    <option value="2">mardis</option>
	    <option value="3">mercredis</option>
	    <option value="4">jeudis</option>
	    <option value="5">vendredis</option>
	    <option value="6">samedis</option>
	    <option value="0">dimanches</option>
	  </select>
	</td>
      </tr>
      <tr>
	<td>Durée</td>
	<td><input v-model="event.duration"/></td>
      </tr>
    </table>

    <div class="group">
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

    </div>

    <button v-on:click="saveEvent">Créer</button>
  </div>
</div>
</template>

<script>
import ListAdherentsLeft from './ListAdherentsLeft';
import ListAdherentsRight from './ListAdherentsRight';
const tools = require('./tools');
const EventService = require('./EventService').service;
const userService = require('./UserService').service;

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
	    endDateTime: "",

	    eventColor: "",
	    recurrentEvent: false

	}
    },
    props: ['events'],
    methods: {
	saveEvent: async function() {
	    //if this is a single or recurrent event
	    if (this.recurrentEvent) {
		let freq = "";
		this.frequency.forEach((elt) => {
		    freq += elt + ",";
		});
		let _freq = "* * * * " + freq.substr(0, freq.length-1);
		this.event.frequency = _freq;
		this.event.endDate = tools.toJSDate(this.endDate, this.endDateTime);
	    }
	    this.event.startDate = tools.toJSDate(this.startDate, this.startDateTime);
	    this.event.style = "background-color: "+this.eventColor;
	    this.addUsersInIDs(); //add users to user_list id of event

	    if (this.recurrentEvent) {
		await EventService.createCourse(this.event);
	    }
	    else {
		await EventService.createEvent(this.event);
	    }
	    //this.$emit('hide-box', true);
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
	    this.usersOut = res;
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
<style scoped>
.days {
    font-size: 15px;
}
.left {
    float: left;
    width: 44%;
    margin: 1vh;
}

</style>
