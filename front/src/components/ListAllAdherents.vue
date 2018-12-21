<template>
<div id="iadherents-all-list" class="group">
  <button v-on:click="displayNewUser">+</button>
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

const UserService = require('./UserService').service;
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
	    const res = await UserService.getAllStudents();	    
	    this.users = res;
	},
	deleteUser: function(id) {
	    UserService.deleteUser(id);
	    const index = this.users.findIndex( elt => { return elt._id === id});
	    this.users.splice(index, 1);
	},
	displayNewUser: function() {
	    this.displayedNewUser = true;
	},
	createUser: async function(newUser) {
	    let res = await UserService.createStudent(newUser);
	    this.messages.push({status: res.status, content: res.data});
	    if (res.status === 0) {
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
	'messages': Array
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
