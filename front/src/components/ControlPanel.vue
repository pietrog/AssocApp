<template>
  <nav id="control-panel" v-if="isConnected" class="group">
    <router-link v-if="isConnected" to="/users" class="base-button">Adhérents</router-link>
    <router-link v-if="isConnected" to="/calendar" class="base-button">Calendrier</router-link>
    <router-link v-if="isConnected" to="/photos" class="base-button">Galerie photo</router-link>
    <button class="" v-if="isConnected" v-on:click="$emit('logout')">Deconnecter</button>
  </nav>
</template>

<script>
const AuthService = require('../services/AuthenticationService').service;

export default {
    name: 'control-panel',
    props: {
	"isConnected": {
	    type: Boolean,
	    required: true,
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
