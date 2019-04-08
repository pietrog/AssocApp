<template>
<b-container fluid>
  <b-row>
    <b-col></b-col>
    <b-col>
      <b-card title="Administration du site"
	      class="mb-2">

	<b-input-group
	  prepend="Pseudo"
	  size="lg"
	  >
	  <b-form-input	
	    type="text"
	    v-model="login"
	    size="sm"
	    />
	  <b-input-group-append>
	    <b-button type="reset"
		      variant="success"
		      size="sm"
		      v-on:click="updateLogin"
		      >
	      Envoyer
	    </b-button>
	  </b-input-group-append>
	</b-input-group>
	
	<b-input-group
	  prepend="Mot de passe"
	  size="lg"
	  >
	  <b-form-input	
	    type="password"
	    v-model="password"
	    size="sm"
	    />
	  <b-input-group-append>
	    <b-button type="reset"
		      v-on:click="updatePassword"
		      variant="success">
	      Envoyer
	    </b-button>
	  </b-input-group-append>
	</b-input-group>

	<b-input-group
	  prepend="@"
	  size="lg"
	  >
	  <b-form-input	
	    type="text"
	    v-model="email"
	    />
	  <b-input-group-append>
	    <b-button type="reset"
		      v-on:click="updateEmail"
		      variant="success">
	      Envoyer
	    </b-button>
	  </b-input-group-append>
	</b-input-group>

	
      </b-card>
    </b-col>
    <b-col></b-col>
  </b-row>
</b-container>
</template>

<script>
import AuthService from '../services/AuthenticationService';

export default {
    name: 'admin',
    data: function() {
	return {
	    login: AuthService.getUser(),
	    password: "",
	    email: AuthService.getEmail()
	}
    },
    methods: {
	updateLogin: async function() {
	    await AuthService.updateLogin(this.login);
	},
	updatePassword: async function() {
	    await AuthService.updatePassword(this.password);
	},
	updateEmail: async function() {
	    await AuthService.updateEmail(this.email);
	}

	
    },
    mounted() {
    }
};
</script>

<style>
</style>
