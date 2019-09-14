<template>
<div class="modal modal-bg"
     :class="{ show: display }"
     >
  <modal v-if="display">

    <template slot="header">
      <h2 class="modal-title">Nouveau membre</h2>
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
		      v-model="email"
		      />
	  </md-field>
	</div>

	<div class="md-layout-item ">
	  <md-field>
	    <label for="email">Telephone</label>
	    <md-input name="phone"
		      id="phone"
		      v-model="phone"
		      />
	  </md-field>
	</div>
	
      </form>
    </template>

    <template slot="footer">
      <div class="md-layout">
      	<div class="md-layout-item md-alignment-center-right md-size-100">
	  <md-button v-on:click="onSubmit"
		     class="md-success md-round">
	    Ajouter
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

const UserService = require('../services/UserService').service;

import Modal from "./Modal";

export default {
    name: 'new-user',
    components: {
	Modal
    },
    data: function() {
	return {
	    user: {
		firstname: "",
		lastname: "",
		birthdateHtml: "",
		emails: [],
		phone_number: []
	    },
	    email: "",
	    phone: "",
	    error: "",
	    showError: false,
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
	    this.user.jsBirthdate = jsdate;
	    this.createAndExit();


	},
	onReset: function() {
	    this.user.firstname = "";
	    this.user.lastname = "";
	    this.user.birthdateHtml = "";
	    this.phone = "";
	    this.email = "";
	    this.error = null;
	    this.showError = true;
	},

	createAndExit: async function() {
	    if (this.email.length > 0)
	    {
		this.user.emails.push(this.email);
	    }
	    if (this.phone.length > 0)
	    {
		this.user.phone_number.push(this.phone);
	    }
	    
	    let res = await UserService.createStudent(this.user);
	    
	    if (res.data.status === 0) {
		tools.sendMessage(this.$store, res);
		this.user._id = res.data.data;
		this.users.push(this.user);
		this.display = false;
	    }
	    else {
		this.error = res.data.message;
		this.showError = true;
	    }
	},
	show: function() {
	    this.display = true;
	}
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
