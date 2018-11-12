<template>
<div id="iadherents-list" class="group">
  <button v-on:click="displayNewUser">+</button>
  Nom/Prénom: <input v-model="stringFilter"></input> <br/>
  Année de naissance <input v-model="dateFilter" ></input>
  <table id="iadherents-list-table">
    <tr>
      <th>Prénom</th>
      <th>Nom</th>
      <th>Année de naissance</th>
      <th>Supprimer</th>
    </tr>
    <one-adherent
      v-for="current in users"
      v-if="filterUser(current)"
      v-bind:adherent="current"
      v-bind:key="current.id"
      v-on:send-user-details="setUser"
      v-on:delete-user="deleteUser">
    </one-adherent>    
  </table>
  <user-details v-if="user"
		v-bind:user="user"
		v-bind:key="user.id"
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
import OneAdherent from './OneAdherent'
import UserDetails from './UserDetails';
import NewUser from './NewUser';

export default {
    name: 'list-adherents',
    data: function() {
	return {
	    stringFilter: "",
	    dateFilter: 0,
	    users: [
		{ firstname: "Odile", lastname: "Deray", birthdate: new Date(1999, 10, 10), id: 5, emails: [], phone_number: [] },
		{ firstname: "Yann", lastname: "Dupuis", birthdate: new Date(2010, 9, 24), id: 1, emails: [], phone_number: [] },
		{ firstname: "Woodz", lastname: "LeFou", birthdate: new Date(2007, 7, 19), id: 2, emails: [], phone_number: [] },
		{ firstname: "Sympa", lastname: "Lecurieux", birthdate: new Date(2008, 3, 13), id: 3, emails: [], phone_number: [] },
		{ firstname: "Emm", lastname: "Macron", birthdate: new Date(2004, 1, 6), id: 4, emails: [], phone_number: [] }
	    ],
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
	deleteUser: function(id) {
	    //@todo nvoyer requete asynchrone au serveur et supprimer l'user ici :)
	    const index = this.users.findIndex( elt => { return elt.id === id});
	    this.users.splice(index, 1);
	},
	displayNewUser: function() {
	    this.displayedNewUser = true;
	},
	createUser: function(newUser) {
	    newUser.birthdate = new Date(newUser.birthdate); //need to provide a date instead of a string
	    this.users.push(newUser);
	    this.displayedNewUser = false;
	}
    },

    components: {
	OneAdherent,
	UserDetails,
	NewUser
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#iadherents-list {
    float: left;
    width: 98%;
}

#iadherents-list-table {
    width: 100%;
}


</style>
