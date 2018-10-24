<template>
<div id="iadherents-list" class="group">
  <table id="iadherents-list-table">
    <tr>
      <th>Prénom</th>
      <th>Nom</th>
      <th>Année de naissance</th>
    </tr>
    <one-adherent
      v-for="current in users"
      v-bind:adherent="current"
      v-bind:key="current.id"
      v-on:send-user-details="setUser">
    </one-adherent>
    
  </table>
  <user-details
    v-if="user"
    v-bind:user="user"
    v-bind:key="user.id">
  </user-details>
</div>
</template>

<script>
import OneAdherent from './OneAdherent'
import UserDetails from './UserDetails';

export default {
    name: 'list-adherents',
    data () {
	return {
	    users: [
		{ firstname: "Odile", lastname: "Deray", id: 5 },
		{ firstname: "Yann", lastname: "Dupuis", id: 1 },
		{ firstname: "Woodz", lastname: "LeFou", id: 2 },
		{ firstname: "Sympa", lastname: "Lecurieux", id: 3 },
		{ firstname: "Emm", lastname: "Macron", id: 4 }
	    ],
	    user: {}
	}
    },
    methods: {
	setUser: function(user) {
	    this.user = user;	    
	}
    },
    components: {
	OneAdherent,
	UserDetails
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#iadherents-list {
    float: left;
}

#iadherents-list-table {
    width: 100%;
}


</style>
