<template>
<b-container fluid>
  <b-row>
    <b-col cols="6">
      <b-form-group horizontal label="Nom" class="mb-0">
        <b-input-group>
          <b-form-input v-model="stringFilter" placeholder="Nom/Prénom" />
          <b-input-group-append>
            <b-btn :disabled="!stringFilter" @click="stringFilter = ''">Effacer</b-btn>
          </b-input-group-append>
        </b-input-group>
      </b-form-group>
    </b-col>
  </b-row>
  <b-row>
    <b-col cols="6">
      <b-form-group horizontal label="Date" class="mb-0">
        <b-input-group>
          <b-form-input v-model="dateFilter" placeholder="Date" />
          <b-input-group-append>
            <b-btn :disabled="!dateFilter" @click="dateFilter = ''">Effacer</b-btn>
          </b-input-group-append>
        </b-input-group>
      </b-form-group>
    </b-col>
  </b-row>
  <b-row>
    <b-col md="6" class="my-1">
      <b-form-group horizontal label="Per page" class="mb-0">
        <b-form-select :options="[5, 10, 15]" v-model="perPage" />
      </b-form-group>
    </b-col>
  </b-row>
  
  <b-row >
    <b-col>
      <b-table striped
	       hover	       
	       :sort-by.sync="sortBy"
	       :sort-desc.sync="sortDesc"
	       :filter="filterUser"
	       responsive="true"
	       head-variant="light"
	       :items="users"
	       :fields="fields"
	       :per-page="perPage"
	       :currentPage="currentPage"
	       v-on:row-clicked="showDetails">

	<!-- Delete button -->
	<template slot="delete"
		  slot-scope="data"
		  >
	  <b-button size="sm" v-on:click.stop="$emit('delete-user', data.item._id)">
	    X
	  </b-button>
	  
	</template>
	
      </b-table>
    </b-col>
  </b-row>
  <b-row>
    <b-col md="6" class="my-1">
      <b-pagination :total-rows="users.length" :per-page="perPage" v-model="currentPage" class="my-0" />
    </b-col>
  </b-row>
  
  <new-user ref="editUserComponent"
	    v-bind:users="users" />
  
</b-container>
</template>

<script>
import NewUser from './NewUser'
import tools from './tools';

export default {
    name: 'list-adherents',
    props: {
	'users': {
	    type: Array,
	    required: true
	}
    },
    data: function() {
	return {
	    fields: [
		{
		    key: "firstname",
		    label: "Prénom",
		    sortable: true
		},
				{
		    key: "lastname",
		    label: "Nom",
		    sortable: true
		},
		{
		    key: "birthdate",
		    label: "Date de naissance",
		    sortable: true,
		    formatter: (value, key, item) => {
			return tools.toInputDate(value);
		    }
		},
		{
		    key: "firstname",
		    label: "Prénom"
		},
		{
		    key: "show_details",
		    label: "show_details"
		},
		{
		    key: "delete",
		    label: "Del",
		    variant: "danger"
		}
	    ],
	    stringFilter: "",
	    dateFilter: 0,
	    currentPage: 1,
	    perPage: 10,
	    sortDesc: false,
	    sortBy: "lastname",
	}
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
	showDetails: function(item) {
	    if (!item.birthdateHtml) {
		item.birthdateHtml = tools.toInputDate(item.birthdate);
	    }
	    this.$refs.editUserComponent.show(item);
	}

    },
    components: {
	NewUser
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
