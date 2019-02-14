<template>
<b-modal ref="newUserModal"
	 hide-footer
	 title="Ajouter un membre">
  <b-form @submit="onSubmit"
	  @reset="onReset"
	  >

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
    <b-form-group label="Adresse e-mail"
		  >
      <b-form-input type="text"
		    v-model="email"
		    placeholder="Entrer une adresse mail">	
      </b-form-input>
    </b-form-group>

    <!-- Phones -->
    <b-form-group label="Téléphone">
      <b-form-input type="text"
		    v-model="phone"
		    placeholder="Entrer un numéro de téléphone">	
      </b-form-input>
    </b-form-group>

    <b-button type="submit"
	      variant="success"
	      >Ajouter le membre</b-button>
    <b-button type="reset"
	      variant="danger"
	      >Effacer</b-button>    
  </b-form>
  <b-alert :show="showError"
	   variant="danger">
    {{error}}
  </b-alert>
</b-modal>

</template>

<script>
const tools = require('./tools');

const UserService = require('../services/UserService').service;

export default {
    name: 'new-user',
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
	    showError: false
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
		this.$refs.newUserModal.hide();
	    }
	    else {
		this.error = res.data.message;
		this.showError = true;
	    }
	},
	show: function() {
	    this.$refs.newUserModal.show();
	}
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
