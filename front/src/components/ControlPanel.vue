<template>
<div
  v-if="isConnected">
  <div>
    COMB TAEKWONDO
  </div>
  <div target="nav_collapse"></div>
  <div is-nav
	      id="nav_collapse">
    <div>
      <div to="/users">Adhérents</div>
      <div to="/calendar">Calendrier</div>
      <div to="/blog">Blog</div>
    </div>
  </div>
  <div>
    <div to="/admin">Administration</div>
  </div>
  <div size="sm"
	    v-if="isConnected"
	    v-on:click="logout">
    Se déconnecter
  </div>
</div>
</template>

<script>
//const AuthService = require('../services/AuthenticationService').service;
import AuthService from'../services/AuthenticationService';

export default {
    name: 'control-panel',
    computed: {
	isConnected() {
	    return this.$store.state.isConnected;
	}
    },
    methods: {
	logout: function() {
	    AuthService.logout();
	    this.$store.commit('deconnect');
	    this.$router.replace('Login');
	}
    }
}
</script>

<style>
</style>
