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
  </div>
</div>
</template>

<script>
const tools = require('./tools');

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
	    this.event.startDate = tools.toJSDate(this.startDateT, this.startDateTime);
	    this.event.endDate = tools.toJSDate(this.endDateT, this.endDateTime);
	    //@todo envoyer les résultats au back
	    this.$emit('hide-event-details')
	}
    }
}
</script>

<style scoped>
</style>
