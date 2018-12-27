<template>
  <nav id="control-panel" class="group">
    <router-link v-if="isConnected" to="/users" class="base-button">Adhérents</router-link>
    <router-link v-if="isConnected" to="/calendar" class="base-button">Calendrier</router-link>
    <router-link v-if="isConnected" to="/photos" class="base-button">Galerie photo</router-link>
    <router-link v-if="!isConnected" to="/login" class="base-button">S'identifier</router-link>
    <button v-if="isConnected" v-on:click="logout">Deconnecter</button>
  </nav>
</template>

<script>
const AuthService = require('../services/AuthenticationService').service;

export default {
    name: 'control-panel',
    methods: {
	logout: function() {
	    AuthService.logout();
	    this.$emit('logout');
	},
    },
    props: {
	"isConnected": Boolean
    }
}
</script>

<style scoped>
#control-panel {
    background-color: #00539C;
    position: relative;
    top: 0;
    right: 0;
    left: 0;
}

  

</style>
