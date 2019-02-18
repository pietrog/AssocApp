<template>
<b-modal ref="eventDetailsModal" hide-footer
	 title="Création d'un évènement">
  <b-form v-if="event"
	  @submit="onSubmit">
    
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

    <b-row>
      <b-col>
	<b-button type="submit"
		  variant="success">Mise à jour</b-button>
      </b-col>
    </b-row>
    <b-btn v-b-toggle.collapse1
	   variant="primary"
	   size="sm">Options de suppression</b-btn>
    <b-collapse id="collapse1" class="mt-2">
      <b-card>
	<b-row>
	  <b-col>
	    Supprimer une instance
	  </b-col>
	  <b-col>
	    <b-button v-on:click="deleteOneAndExit"
		      variant="danger"
		      class="close"
		      aria-label="close">X</b-button>
	  </b-col>
	</b-row>
	<b-row>
	  <b-col>
	    Supprimer toutes les instances
	  </b-col>
	  <b-col>
	    <b-button v-on:click="deleteAllAndExit"
		      class="close"
		      aria-label="close"
		      variant="danger">X</b-button>
	  </b-col>
	</b-row>
      </b-card>
    </b-collapse>
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
	    event: null,
	    startDateT: "2019-01-01",
	    endDateT: "2019-01-01", 
	    startDateTime: "10:00",
	    endDateTime: "10:00"
	}
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
	show: function(event) {
	    this.startDateT = tools.toInputDate(event.startDate);
	    this.endDateT = tools.toInputDate(event.endDate);
	    this.startDateTime = tools.fromJSDateToInputTime(event.startDate);
	    this.endDateTime = tools.fromJSDateToInputTime(event.endDate);
	    this.event = event;
	    this.$refs.eventDetailsModal.show();
	}	
    }
}
</script>

<style>

</style>
