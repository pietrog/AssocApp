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
	<td><input v-model="startDate" type="date" />-<input v-model="startDateTime" type="time"/></td>
      </tr>
      <tr>
	<td>Date de fin</td>
	<td><input v-model="endDate" type="date"/>-<input v-model="endDateTime" type="time"/></td>
      </tr>    
    </table>
    <button v-on:click="saveEvent">Créer</button>
  </div>
</div>
</template>

<script>
const tools = require('./tools');
const EventService = require('./EventService').service;

export default {
    name: 'new-event',
    data: function() {
	return {
	    event: {
	    },
	    startDate: tools.toInputDate(new Date(Date.now())),
	    endDate: tools.toInputDate(new Date(Date.now())),
	    startDateTime: "12:00",
	    endDateTime: "12:00"	    
	}
    },
    props: ['events'],
    methods: {
	saveEvent: async function() {
	    const startDate = tools.toJSDate(this.startDate, this.startDateTime);
	    const endDate = tools.toJSDate(this.endDate, this.endDateTime);
	    this.event.startDate = startDate;
	    this.event.endDate = endDate;
	    await EventService.createEvent(this.event);
	    this.events.push(this.event);
	    this.$emit('hide-box', true);
	}
    }
}
</script>

<style scoped>
</style>
