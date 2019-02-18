<template>
<b-modal ref="userDetailsModal"
	 hide-footer
	 title="Fiche de membre">
  <b-form v-if="user"
	  @submit="onSubmit">

    <!-- Prénom -->
    <b-form-group label="Prénom">
      <b-form-input type="text"
		    required
		    v-model="user.firstname"
		    placeholder="Entrer le prénom">	
      </b-form-input>
    </b-form-group>

    <!-- Nom de famille -->
    <b-form-group label="Nom de famille">
      <b-form-input type="text"
		    required
		    v-model="user.lastname"
		    placeholder="Entrer le nom de famille">	
      </b-form-input>
    </b-form-group>

    <!-- Birthdate -->
    <b-form-group label="Date de naissance">
      <b-form-input type="date"
		    required		    
		    v-model="user.birthdateHtml"
		    placeholder="Entrer la date de naissance">	
      </b-form-input>
    </b-form-group>
    

    <!-- Emails -->
    <b-form-group label="Email(s)"
		  >
      <b-button v-if="user.emails.length < 3"
		v-on:click="addElt(user.emails)">
	+
      </b-button>
      <b-input-group v-for="(mail, index) in user.emails"		     
		     label-for="nestedMail"
		     label="">	
	<b-form-input type="text"
		      required
		      id="nestedMail"
		      v-model="user.emails[index]"
		      placeholder="Entrer une adresse mail">	
	</b-form-input>
	<b-input-group-append>
	  <b-button v-on:click="removeElt(user.emails, index)">-</b-button>
	</b-input-group-append>
      </b-input-group>
    </b-form-group>

    <!-- Phones -->
    <b-form-group label="Téléphone(s)">
      <b-button v-if="user.phone_number.length < 3" v-on:click="addElt(user.phone_number)">+</b-button>
      <b-input-group v-for="(mail, index) in user.phone_number"
		     v-bind:key="user.phone_number[index]"
		     label-for="nestedPhone"
		     label="">	
	<b-form-input type="text"
		      required
		      v-model="user.phone_number[index]"
		      placeholder="Entrer un numéro de téléphone">	
	</b-form-input>
	<b-input-group-append>
	  <b-button v-on:click="removeElt(user.phone_number, index)">-</b-button>
	</b-input-group-append>
      </b-input-group>
    </b-form-group>

    <b-button type="submit"
	      variant="success"
	      >Mise à jour</b-button>    
  </b-form>
</b-modal>

</template>

<script>
const tools = require('./tools');
const UserService = require('../services/UserService').service;

export default {
    name: 'UserDetails',
    data: function() {
	return {
	    user: null,
	    editUser: false,
	    buttonLabel: "Ajouter"
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
	    this.$refs.userDetailsModal.show();

	}
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
