<template>
<div id="login-main">
  <h1>Identification</h1>
  <form>    
    <table class="">
      <tr>
	<td><label>Adresse e-mail</label></td>
	<td><input required type="text" v-model="user" /></td>
      </tr>
      <tr>
	<td><label>Mot de passe</label></td>
	<td><input required type="password" v-model="password"/></td>
      </tr>
    </table>
    <hr/>
    <h1 class="error-identification" v-if="message">{{message}}</h1>
    <button type="submit" v-on:click="login">Soumettre</button>
  </form>
</div>
</template>

<script lang='js'>
const AuthService = require('../services/AuthenticationService').service;

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
	login: async function() {
	    const res = await AuthService.authenticate(this.user, this.password);
	    this.message = AuthService.getMessage();
	    if (res) {
		this.$emit('authentication-success');		
	    }
	}
    }
}
</script>

<style scoped>
#login-main {
    /*background-color: #00539C;*/

    /*position: fixed;
    top: 0;
    left: 0;*/


    /*color: white;*/
}

.error-identification {
    
}
</style>
