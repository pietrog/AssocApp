<template>
<b-modal ref="eventDetailsModal" hide-footer
	 title="Création d'un évènement">
  <b-form @submit="onSubmit">
    
    <!-- switch between single and multi events -->
    <b-form-group horizontal
		  label="Nom"
		  label-class="font-weight-bold pt-0"
		  >
      <b-form-input v-model="event.title" />
    </b-form-group>

    <!-- switch between single and multi events -->
    <b-card>
      
      <b-form-group horizontal
		    label="Date de début"
		    label-class="font-weight-bold pt-0"
		    >
	<b-form-input type="date"
		      v-model="startDateT" />
	<b-form-input type="time"
		      v-model="startDateTime" />
	
      </b-form-group>
      
    </b-card>

    <!-- switch between single and multi events -->
    <b-card>
      
      <b-form-group horizontal
		    label="Date de fin"
		    label-class="font-weight-bold pt-0"
		    >
	<b-form-input type="date"
		      v-model="endDateT" />
	<b-form-input type="time"
		      v-model="endDateTime" />
	
      </b-form-group>
      
    </b-card>

    <b-button type="submit">Mise à jour</b-button>
    <b-button v-on:click="deleteOneAndExit">Supprimer une instance</b-button>
    <b-button v-on:click="deleteAllAndExit">Supprimer toutes les instances</b-button>    
    
  </b-form>
</b-modal>

</template>

<script>
const tools = require('./tools');
const EventService = require('../services/EventService').service;

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
    props: {
	'event': { 
	    type: Object,
	    required: true
	},
    },
    methods: {
	onSubmit: function() {
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
	    const result = await EventService.deleteOneEvent(this.event._id);
	    tools.sendMessage(this.$store, result);
	},
	deleteAllAndExit: async function() {
	    const result = await EventService.deleteAllEventsByName(this.event.name);
	    tools.sendMessage(this.$store, result);
	},
	show: function() {
	    this.$refs.eventDetailsModal.show();
	}
	
    }
}
</script>

<style>

</style>
