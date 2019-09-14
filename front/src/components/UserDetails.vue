<template>
<div class="modal modal-bg"
     :class="{ show: display }"
     >
  <modal v-if="display">
    
    <template slot="header">
      <h2 class="modal-title">Modification fiche membre</h2>
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
	    <label for="firstname">Prénom</label>
	    <md-input name="firstname"
		      id="firstname"
		      v-model="user.firstname"
		      />
	  </md-field>
	</div>
	
	<div class="md-layout-item">
	  <md-field>
	    <label for="lastname">Nom de famille</label>
	    <md-input name="lastname"
		      id="lastname"
		      v-model="user.lastname"
		      />
	  </md-field>
	</div>
	
	<div class="md-layout-item md-size-75">
	  <md-datepicker name="birthdate"
			 id="birthdate"
			 v-model="user.birthdateHtml"
			 md-immediately
			 >
	    <label for="lastname">Date de naissance</label>
	  </md-datepicker>
	</div>
	
	<div class="md-layout-item md-size-75">
	  <md-field>
	    <label for="email">Adresse e-mail</label>
	    <md-input name="email"
		      id="email"
		      v-model="user.emails[0]"
		      />
	  </md-field>
	</div>
	
	<div class="md-layout-item md-size-75">
	  <md-field>
	    <label for="email">Telephone</label>
	    <md-input name="phone"
		      id="phone"
		      v-model="user.phone_number[0]"
		      />
	  </md-field>
	</div>
	
	
      </form>
    </template>
    
  </modal>
</div>

</template>

<script>
const tools = require('./tools');
const UserService = require('../services/UserService').service;

import Modal from "./Modal";

export default {
    name: 'UserDetails',
    components: {
	Modal
    },
    data: function() {
	return {
	    user: null,
	    editUser: false,
	    buttonLabel: "Ajouter",
	    display: false
	}
    },
    props: {
	"users": {
	    type: Array,
	    required: true
	}
    },
    methods: {
	onSubmit: async function() {
	    //parse js date
	    let jsdate = tools.toJSDate(this.user.birthdateHtml, "00:00");	    
	    this.user.birthdate = jsdate.getTime();
	    
	    this.updateAndExit();

	    this.$refs.userDetailsModal.hide();
	},
	updateAndExit: async function() {
	    const res = await UserService.updateUser(this.user);
	},
	addElt: function(array) {
	    array.push("");
	},
	removeElt: function(array, index) {
	    array.splice(index, 1);
	},
	show: function(user) {
	    
	    this.user = user;
	    this.display = true;

	}
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
