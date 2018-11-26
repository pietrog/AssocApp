<template>
<div id="iadherents-list2" class="group">
  <table id="iadherents-list-table2">
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
      v-on:send-user-details="$emit('send-user-details', $event)"
      v-on:delete-user="$emit('delete-user', $event)">
      
    </one-adherent>    
  </table>  
</div>
</template>

<script>
import OneAdherent from './OneAdherent'

export default {
    name: 'list-adherents2',
    props: ['users', 'stringFilter', 'dateFilter'],
    methods: {
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

    },

    components: {
	OneAdherent,
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#iadherents-list2 {
    float: left;
    width: 98%;
}

#iadherents-list-table2 {
    width: 100%;
}


</style>
