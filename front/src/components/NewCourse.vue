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
    <button v-on:click="saveEvent">Créer</button>
  </div>
</div>
</template>

<script>
export default {
    name: 'new-course',
    data: function() {
	return {
	    event: {}
	}
    },
    props: ['events'],
    methods: {
	saveEvent: function() {
	    this.events.push(this.event);
	    this.$emit('hide-box', true);
	}
    }
}
</script>

<style scoped>
.days {
    font-size: 15px;
}
</style>
