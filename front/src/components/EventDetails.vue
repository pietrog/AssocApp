<template>
<div id="back-popup-box" v-on:click="hide">
  <div id="popup-box" v-on:click.stop="">
    {{event.title}}
    <table>
      <tr>
	<td>Nom de l'évènement</td>
	<td><input v-model="event.title" /></td>
      </tr>
      <tr>
	<td>Date de début</td>
	<td><input v-model="startDateT" type="date" />-<input v-model="startDateTime" type="time"/></td>
      </tr>
      <tr>
	<td>Date de fin</td>
	<td><input v-model="endDateT" type="date"/>-<input v-model="endDateTime" type="time"/></td>
      </tr>    
    </table>
    <button v-on:click="saveAndExit">Mise a jour</button>
    <button v-on:click="deleteOneAndExit">Supprimer cet évènement</button>
    <button v-on:click="deleteAllAndExit">Supprimer tous les évènements similaires</button>
  </div>
</div>
</template>

<script>
const tools = require('./tools');
const EventService = require('./EventService').service;

export default {
    name: 'event-details',
    data: function() {
	return {
	    startDateT: tools.toInputDate(this.event.startDate),
	    endDateT: tools.toInputDate(this.event.endDate),
	    startDateTime: tools.fromJSDateToInputTime(this.event.startDate),
	    endDateTime: tools.fromJSDateToInputTime(this.event.endDate),
	}
    },
    props: ['event'],
    methods: {
	//hide details vue when user clicks on back user details div
	hide: function(event) {
	    if (event.srcElement.id === "back-popup-box")
		this.$emit('hide-event-details')
	},
	saveAndExit: function() {
	    const jsStartDate = tools.toJSDate(this.startDateT, this.startDateTime);
	    const jsEndDate = tools.toJSDate(this.endDateT, this.endDateTime);
	    if (!tools.validateStartEndDates(jsStartDate, jsEndDate))
	    {
		alert('La date de fin est inférieure à la date de début');
		return;
	    }
	    this.event.startDate = jsStartDate;
	    this.event.endDate = jsEndDate;
	    //@todo envoyer les résultats au back
	    this.$emit('hide-event-details')
	},
	deleteOneAndExit: async function() {
	    await EventService.deleteOneEvent(this.event._id);
	},
	deleteAllAndExit: async function() {
	    await EventService.deleteAllEventsByName(this.event.name);
	}
	
    }
}
</script>

<style scoped>

</style>
