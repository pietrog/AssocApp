<template>
  <h2>Bienvenue {{user}}</h2>
</template>
<script>
const AuthService = require('../services/AuthenticationService').service;

export default {
    name: 'welcome',
    data: function() {
	return {
	    user: ""
	}
    },
    mounted() {
	this.user = AuthService.getUser();
    }
};
</script>
<style scoped>
</style>
