<template>
<div>
  COUCOU
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
	}
    }
}
</script>

<style scoped>
</style>
