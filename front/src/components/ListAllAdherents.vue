<template>
<b-container fluid>
  <b-row>
    <b-col>
      <b-card title="Gestion des membres du club"
	      class="mb-2"
	      >
	<b-row>
	  <b-col>
	    <b-button label="Ajouter un adhérent"
		      v-on:click="showNewUser">Nouveau membre</b-button>
	  </b-col>
	</b-row>	
	<b-row>
	  <b-col cols="6">
	    <b-form-group horizontal label="Prénom/Nom" class="mb-0">
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
	    <b-form-group horizontal label="Par page" class="mb-0">
              <b-form-select :options="[5, 10, 15]" v-model="perPage" />
	    </b-form-group>
	  </b-col>
	</b-row>
      </b-card>
    </b-col>
  </b-row>
  <b-row>
    <b-col md="6" class="my-1">
      <b-pagination :total-rows="users.length" :per-page="perPage" v-model="currentPage" class="my-0" />
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
	  <b-button size="sm"
		    v-on:click.stop="deleteUser(data.item._id)"
		    class="de"
		    >
	    X
	  </b-button>
	  
	</template>
	
      </b-table>
    </b-col>
  </b-row>
  
  <new-user ref="editUserComponent"
	    v-bind:users="users" />
  
  <new-user ref="newUserComponent"
	    v-bind:users="users"/>
</b-container>
</template>

<script>
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
		    key: "jsBirthdate",
		    label: "Année de naissance",
		    sortable: true,
		    formatter: (value, key, item) => {
			return value.getFullYear();
		    }
		},
		{
		    key: "firstname",
		    label: "Prénom"
		},
		{
		    key: "delete",
		    label: "Supp",
		    class: "w-auto "
		}
	    ],
	    stringFilter: "",
	    dateFilter: 0,
	    currentPage: 1,
	    perPage: 10,
	    sortDesc: false,
	    sortBy: "lastname"
	}
    },
    methods: {
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
	filterUser: function(current) {
	    let filterResult = true;
	    filterResult &= tools.stringFilter([current.firstname, current.lastname], this.stringFilter);
	    filterResult &= tools.dateFilter(current.jsBirthdate, this.dateFilter);
	    return filterResult;
	},
	showDetails: function(item) {
	    if (!item.birthdateHtml) {
		item.birthdateHtml = tools.toInputDate(item.birthdate);
	    }
	    this.$refs.editUserComponent.show(item);
	},
	showNewUser: function() {
	    this.$refs.newUserComponent.show();
	}
	
    },

    components: {
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
