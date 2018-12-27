<template>
<div id="login-main">
  <form>    
    <h1>S'identifier</h1>
    <table class="table">
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
	    password: ''
	};
    },
    methods: {
	login: function() {
	    AuthService.authenticate(this.user, this.password);
	    this.$emit('authentication-success');
	}
    }
}
</script>

<style scoped>
#login-main {
    background-color: #00539C;
    margin: 0px;
    padding: 0px;
    /*position: fixed;
    top: 0;
    left: 0;*/
    width: 100%;
    height: 100%;

    color: white;
}
</style>
