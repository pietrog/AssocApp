<template>
<div class="modal modal-bg"
     :class="{ show: display }"
     >
  <modal v-if="display">

    <template slot="header">
      <h2 class="modal-title">Creation d'un evenement</h2>
      <md-button
        class="md-simple md-close md-just-icon md-round modal-default-button"
        @click="display = false"
        >
        <md-icon>clear</md-icon>
      </md-button>
    </template>

    <template slot="body">
      <form class="md-layout">
	
	<div class="md-layout-item">
	  <md-field>
	    <md-switch v-model="recurrentEvent">
              {{ recurrentEvent ? "Liste" : "Solo" }}
            </md-switch>
	  </md-field>
	</div>

	<div class="md-layout-item">
	  <md-field>
	    <label for="title">Nom du cours</label>
	    <md-input name="title"
		      id="title"
		      v-model="event.title"
		      />
	  </md-field>
	</div>

	<div class="md-layout-item">
	  <md-field>
	    <label for="color">Couleur</label>
	    <md-input name="color"
		      id="color"
		      type="color"
		      v-model="eventColor"
		      />
	  </md-field>
	</div>

	<div class="md-layout-item">
	  <md-field>
	    <label for="description">Description</label>
	    <md-input name="description"
		      id="description"
		      v-model="event.description"
		      />
	  </md-field>
	</div>

	<!-- First occurence -->
	<div class="md-layout-item">
	  <md-field>
	    <md-datepicker name="first"
			   id="first"
			   v-model="startDate"
			   md-immediately
			   >
	      <label for="first">Premier cours</label>
	    </md-datepicker>
	  </md-field>
	</div>

	<!-- Event duration in minutes -->
	<div class="md-layout-item">
	  <md-field>
	    <label for="duration">Durée (min)</label>
	    <md-input name="duration"
		      id="duration"
		      type="number"
		      v-model="event.duration"
		      />
	  </md-field>
	</div>

	<!-- End course -->
	<div class="md-layout-item">
	  <md-field>
	    <md-datepicker name="first"
			   id="first"
			   v-model="startDate"
			   md-immediately
			   >
	      <label for="first">Last cours</label>
	    </md-datepicker>
	  </md-field>
	</div>

      </form>
    </template>

    <template slot="footer">
      <div class="md-layout">
      	<div class="md-layout-item md-alignment-center-right md-size-100">
	  <md-button v-on:click="onSubmit"
		     class="md-success md-round">
	    Mise à jour
	  </md-button>
	  <md-button v-on:click="deleteOneAndExit"
		     class="md-success md-round">
	    Supprimer 1
	  </md-button>
	  <md-button v-on:click="deleteAllAndExit"
		     class="md-success md-round">
	    Supprimer tous
	  </md-button>


	</div>
	<div class="md-layout-item ">
	  <div class="container">
	    <span class="alert alert-danger"
		  v-if="error">
	      {{ error }}
	    </span>
	  </div>
	</div>
      </div>
    </template>

  </modal>
</div>
</template>

<script>
const tools = require('./tools');
const EventService = require('../services/EventService').service;

import Modal from "./Modal";

export default {
    name: 'event-details',

    components: {
	Modal
    },
    
    data: function() {
	return {
	    event: null,
	    startDateT: "2019-01-01",
	    endDateT: "2019-01-01", 
	    startDateTime: "10:00",
	    endDateTime: "10:00",
	    display: false
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
	    this.display = false;
	},
	deleteAllAndExit: async function() {
	    const result = await EventService.deleteAllEventsByName(this.event.name);
	    tools.sendMessage(this.$store, result);
	    this.display = false;
	},
	show: function(event) {
	    this.startDateT = tools.toInputDate(event.startDate);
	    this.endDateT = tools.toInputDate(event.endDate);
	    this.startDateTime = tools.fromJSDateToInputTime(event.startDate);
	    this.endDateTime = tools.fromJSDateToInputTime(event.endDate);
	    this.event = event;
	    this.display = true;;
	}	
    }
}
</script>

<style>

</style>
