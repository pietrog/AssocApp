<template>
  <nav id="control-panel" v-if="isConnected" class="group">
    <router-link to="/users" class="base-button">Adhérents</router-link>
    <router-link to="/calendar" class="base-button">Calendrier</router-link>
    <router-link to="/blog" class="base-button">Blog</router-link>
    <button class="" v-if="isConnected" v-on:click="logout">Deconnecter</button>
  </nav>
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

<style scoped>
#control-panel {
    /*background-color: #00539C;*/
    position: relative;
    top: 0;
    right: 0;
    left: 0;
}
</style>
