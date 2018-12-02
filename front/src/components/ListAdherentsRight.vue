<template>
<div id="iadherents-list" class="group">
  <table id="iadherents-list-table">
    <tr>
      <th></th>
      <th>Prénom</th>
      <th>Nom</th>
    </tr>
    <one-adherent-right
      v-for="current in users"
      v-if="filterUser(current)"
      v-bind:adherent="current"
      v-bind:key="current.id"
      v-on:move-left="$emit('move-left', $event)"
      >
    </one-adherent-right>    
  </table>  
</div>
</template>

<script>
import OneAdherentRight from './OneAdherentRight'

export default {
    name: 'list-adherents-right',
    props: {
	'users': {type: Array, default: []},
	'stringFilter': {type: String, default: ""},
	'dateFilter': {type: Number, default: 0},
    },
    methods: {
	filterUser: function(current) {
	    let filterResult = true;
	    
	    //filter on firstname and lastname
	    if (this.stringFilter && this.stringFilter.length > 0) {
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
	OneAdherentRight,
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

#iadherents-list-table {
    width: 100%;
}


</style>
