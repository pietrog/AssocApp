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
	<td>Description</td>
	<td><input type="text" v-model="event.title" /></td>
      </tr>
      <tr>
	<td>Premier cours</td>
	<td><input type="date" v-model="event.firstdate"/></td>
      </tr>
      <tr>
	<td>Occurence</td>
	<td>
	  Tous les 
	  <select multiple="true" class="days">
	    <option>lundis</option>
	    <option>mardis</option>
	    <option>mercredis</option>
	    <option>jeudis</option>
	    <option>vendredis</option>
	    <option>samedis</option>
	    <option>dimanches</option>
	  </select>
	</td>
      </tr>
      <tr>
	<td>Durée</td>
	<td><input v-model="event.duration"/></td>
      </tr>
      <tr>
	<td>Date de début</td>
	<td><input v-model="event.startDate" type="date"/></td>
      </tr>
      <tr>
	<td>Date de fin</td>
	<td><input v-model="event.endDate" type="date"/></td>
      </tr>    
    </table>

    <div class="group">
      <list-adherents
	v-bind:users="users"
	v-bind:dateFilter="dateFilter"
	v-bind:stringFilter="stringFilter"
	list-mode="read-only"	
	class="left"
	/>
      <list-adherents
	v-bind:users="users2"
	v-bind:dateFilter="dateFilter"
	v-bind:stringFilter="stringFilter"
	list-mode="read-only"
	class="left"
	/>

    </div>

    <button v-on:click="saveEvent">Créer</button>
  </div>
</div>
</template>

<script>
import ListAdherents from './ListAdherents';

export default {
    name: 'new-course',
    data: function() {
	return {
	    event: {},
	    stringFilter: "",
	    dateFilter: 0,	   
	    users: [
		{ firstname: "Obi", lastname: "One",
		  birthdate: new Date(1999, 10, 10), id: 5, emails: [], phone_number: [] },
		{ firstname: "Dark", lastname: "Vador",
		  birthdate: new Date(2010, 9, 24), id: 1, emails: [], phone_number: [] },
	    ],

	    users2: [
		{ firstname: "Obi2", lastname: "One",
		  birthdate: new Date(1999, 10, 10), id: 5, emails: [], phone_number: [] },
		{ firstname: "Dark2", lastname: "Vador",
		  birthdate: new Date(2010, 9, 24), id: 1, emails: [], phone_number: [] },
	    ]

	}
    },
    props: ['events'],
    methods: {
	saveEvent: function() {
	    this.events.push(this.event);
	    this.$emit('hide-box', true);
	}
    },
    components: {
	ListAdherents,
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
