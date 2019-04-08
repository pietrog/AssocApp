<template>
<b-navbar toggleable="md"
	  variant="primary"
	  type="light"
	  v-if="isConnected">
  <b-navbar-brand>
    COMB TAEKWONDO
  </b-navbar-brand>
  <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
  <b-collapse is-nav
	      id="nav_collapse">
    <b-navbar-nav>
      <b-nav-item to="/users">Adhérents</b-nav-item>
      <b-nav-item to="/calendar">Calendrier</b-nav-item>
      <b-nav-item to="/blog">Blog</b-nav-item>
    </b-navbar-nav>
  </b-collapse>
  <b-navbar-nav>
    <b-nav-item to="/admin">Administration</b-nav-item>
  </b-navbar-nav>
  <b-button size="sm"
	    v-if="isConnected"
	    v-on:click="logout">
    Se déconnecter
  </b-button>
</b-navbar>
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
