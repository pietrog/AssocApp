<template>
<div id="back-popup-box" v-on:click="$emit('hide-box', true)">
  <div id="popup-box" v-on:click.stop="">
    Nouvel évènement
    <table>
      <tr>
	<td>Nom de l'évènement</td>
	<td><input v-model="event.title" /></td>
      </tr>
      <tr>
	<td>Date de début</td>
	<td><input v-model="event.startDate" type="date" />-<input v-model="event.startDateTime" type="time"/></td>
      </tr>
      <tr>
	<td>Date de fin</td>
	<td><input v-model="event.endDate" type="date"/>-<input v-model="event.endDateTime" type="time"/></td>
      </tr>    
    </table>
    <button v-on:click="saveEvent">Créer</button>
  </div>
</div>
</template>

<script>
const tools = require('./tools');

export default {
    name: 'new-event',
    data: function() {
	return {
	    event: {
		startDate: tools.toInputDate(new Date(Date.now())),
		endDate: tools.toInputDate(new Date(Date.now())),
		startDateTime: "12:00",
		endDateTime: "12:00"
	    }
	}
    },
    props: ['events'],
    methods: {
	saveEvent: function() {
	    this.event.startDate = tools.toJSDate(this.event.startDate, this.event.startDateTime);
	    this.event.endDate = tools.toJSDate(this.event.endDate, this.event.endDateTime);
	    this.events.push(this.event);
	    this.$emit('hide-box', true);
	}
    }
}
</script>

<style scoped>
</style>
