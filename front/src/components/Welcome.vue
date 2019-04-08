<template>
  <h2>Bienvenue {{user}}</h2>
</template>
<script>
import AuthService from '../services/AuthenticationService';

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
<style>
</style>
