<template>
<b-modal ref="loginModal"
	 hide-footer
	 centered
	 title="Authentification">
  
  <b-form>
  
    <b-form-group id="login-group"
                  label="Login"
                  label-for="exampleInput1">
      <b-form-input id="login"
		    type="text"
		    v-model="user"
		    required
		    placeholder="Entrer le login" >
      </b-form-input>
      
    </b-form-group>


    <b-form-group id="password-group"
                  label="Mot de passe"
                  label-for="exampleInput2">
      <b-form-input id="password"
                    type="password"
                    v-model="password"
                    required
                    placeholder="Mot de passe">
      </b-form-input>
    </b-form-group>
    
    <b-button v-on:click="login" variant="primary">Submit</b-button>
    <h1 v-if="message">{{message}}</h1>
  </b-form>
</b-modal>  
</template>

<script lang='js'>
import AuthService from '../services/AuthenticationService';

export default {
    name: 'login',
    data: function() {
	return {
	    user: '',
	    password: '',
	    message: null
	};
    },
    methods: {
	login: async function (event) {
	    const res = await AuthService.authenticate(this.user, this.password);
	    this.message = AuthService.getMessage();
	    console.log(res);
	    if (res) {
		this.$store.commit('connect');
		this.$router.replace('Welcome');
	    }	    
	}
    },
    mounted() {
	this.$refs.loginModal.show();
    }
}
</script>

<style>

</style>
