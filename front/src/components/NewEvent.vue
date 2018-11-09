<template>
<div id="back-popup-box" v-on:click="$emit('hide-box', true)">
  <div id="popup-box" v-on:click.stop="">
    <table>
      <tr>
	<td>Nom de l'évènement</td>
	<td><input v-model="event.title" /></td>
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
    name: 'new-event',
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
</style>
