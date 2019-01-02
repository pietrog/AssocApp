<template>
<div id="iadherents-all-list" class="group">
  <button title="Ajouter un adhérent" class="fixed-button" v-on:click="displayNewUser">+</button>
  Nom/Prénom: <input v-model="stringFilter"></input> <br/>
  Année de naissance <input v-model="dateFilter" ></input>
  <list-adherents
    
    v-bind:users="users"
    v-bind:dateFilter="dateFilter"
    v-bind:stringFilter="stringFilter"
    v-on:send-user-details="setUser"
    v-on:delete-user="deleteUser"
    v-bind:read-only="false"
    />
  <user-details v-bind:user="user"
		v-bind:key="user._id"
		v-bind:class="{'hidden': hiddenUserDetails}"
		v-on:hide-user-details="hiddenUserDetails = true"
		/>
  <new-user v-if="displayedNewUser"
	    v-on:save-user="createUser"
	    v-on:hide-new-user="displayedNewUser = false"
	    />
  
</div>
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
	    stringFilter: "",
	    dateFilter: 0,
	    users: [],
	    user: {},
	    displayedNewUser: false,
	    hiddenUserDetails: true
	}
    },
    methods: {
	setUser: function(user) {
	    this.user = user;
	    this.hiddenUserDetails = false;
	},
	filterUser: function(current) {
	    let filterResult = true;

	    //filter on firstname and lastname
	    if (this.stringFilter.length > 0) {
		filterResult = current.firstname.toLowerCase().includes(this.stringFilter.toLowerCase()) ||
		current.lastname.toLowerCase().includes(this.stringFilter.toLowerCase());
	    }
	    //filter on year of birth (inputed date will be greather)
	    if (this.dateFilter && this.dateFilter > 1970 && this.dateFilter < 2020) {
		filterResult &= current.birthdate.getFullYear() <= this.dateFilter;
	    }
	    
	    return filterResult;
	},
	getAllAdherentsFromBack: async function() {
	    try {
		const res = await UserService.getAllStudents();
		this.users = res.data.data;
	    }
	    catch(err) {
		this.messages.push({status: 1, content: 'Vous devez vous authentifier'});
	    }
	},
	deleteUser: async function(id) {
	    const result = await UserService.deleteUser(id);
	    tools.sendMessage(this.messages, result);
	    if (result.data.status === 0) {
		const index = this.users.findIndex( elt => { return elt._id === id});	    
		this.users.splice(index, 1);
	    }
	},
	displayNewUser: function() {
	    this.displayedNewUser = true;
	},
	createUser: async function(newUser) {
	    let res = await UserService.createStudent(newUser);
	    tools.sendMessage(this.messages, res);
	    if (res.data.status === 0) {
		newUser._id = res.data.data.id;
		this.users.push(newUser);
		this.displayedNewUser = false;
	    }
	}
    },

    components: {
	ListAdherents,
	UserDetails,
	NewUser
    },

    props: {
	'messages': { //info messages displayed in infopanel
	    type: Array,
	    required: true
	}
    },

    mounted() {
	this.getAllAdherentsFromBack();
    }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#iadherents-all-list {
    float: left;
    width: 98%;
}


</style>
