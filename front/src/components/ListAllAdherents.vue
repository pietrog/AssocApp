<template>
<b-container fluid>
  <b-row>
    <b-col>
      <b-button label="Ajouter un adhérent"
		v-on:click="showNewUser">Nouveau membre</b-button>
    </b-col>
  </b-row>
  <b-row>
    <b-col>
      <list-adherents
	v-bind:users="users"
	v-on:send-user-details="setUser"
	v-on:delete-user="deleteUser"
	/>
      <user-details v-bind:user="user"
		    v-bind:key="user._id"
		    />
      <new-user ref="newUserComponent"
		v-bind:users="users"/>
    </b-col>
  </b-row>
</b-container>
</template>

<script>
import ListAdherents from './ListAdherents';
import UserDetails from './UserDetails';
import NewUser from './NewUser';
const tools = require('./tools');

const UserService = require('../services/UserService').service;
const util = require('util');

export default {
    name: 'list-all-adherents',
    data: function() {
	return {
	    users: [],
	    user: {},
	}
    },
    methods: {
	showNewUser: function() {
	    this.$refs.newUserComponent.show();
	},
	setUser: function(user) {
	    this.user = user;
	},
	getAllAdherentsFromBack: async function() {
	    try {
		const res = await UserService.getAllStudents();
		const users = res.data.data;
		users.forEach((elt) => {
		    elt.jsBirthdate = new Date(elt.birthdate);
		});
		this.users = res.data.data;
	    }
	    catch(err) {
		tools.sendMessage(this.$store, {status: 1, content: 'Vous devez vous authentifier'});
	    }
	},
	deleteUser: async function(id) {
	    const result = await UserService.deleteUser(id);
	    tools.sendMessage(this.$store, result);
	    if (result.data.status === 0) {
		const index = this.users.findIndex( elt => { return elt._id === id});	    
		this.users.splice(index, 1);
	    }
	},
    },

    components: {
	ListAdherents,
	UserDetails,
	NewUser
    },

    mounted() {
	this.getAllAdherentsFromBack();
    }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
