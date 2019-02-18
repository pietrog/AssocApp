<template>
  
<b-container fluid>
  <b-row>
    <b-col>
      <b-card title="Gestion du blog"
	      class="mb-2"
	      >
	<b-button title="Ajouter une publication"
		  v-on:click="showNewEntry">
	  Nouvelle publication
	</b-button>
      </b-card>
    </b-col>
  </b-row>
  
  <b-row>
    <b-col>      
      <b-table striped
	       hover
	       :sort-by.sync="sortBy"
	       :sort-desc.sync="sortDesc"
	       :items="entries"
	       :fields="fields"
	       :per-page="perPage"
	       :currentPage="currentPage"
	       v-on:row-clicked="showDetails">

	<!-- delete button -->
	<template slot="delete"
		  slot-scope="data">
	  <b-button size="sm"
		    v-on:click.stop="deleteEntry(data.item._id)"
		    class="de"
		    >
	    X
	  </b-button>
	  
	</template>
	
      </b-table>
      
    </b-col>
  </b-row>
  <new-entry ref="newEntry"
	     v-bind:entries="entries"
	     />
  <entry-details ref="entryDetails"
		 v-bind:entries="entries"
		 />
  
</b-container>
</template>

<script>
import Publication from './Publication';
import NewEntry from './NewEntry';
import EntryDetails from './EntryDetails';

const BlogService = require('../services/BlogService').service;
const tools = require('./tools');

export default {
    name: 'blog',
    components: {
	Publication,
	NewEntry,
	EntryDetails
    },
    data: function() {
	return {
	    entries: [],
	    fields: [
		{
		    key: 'title',
		    label: 'Titre',
		    sortable: true
		},
		{
		    key: 'publication_date',
		    label: "Date de publication",
		    sortable: true,
		    formatter: (value, key, item) => {
			return tools.toInputDate(value);
		    }

		},
		{
		    key: 'expiry_date',
		    label: "Date de fin",
		    sortable: true,
		    formatter: (value, key, item) => {
			return tools.toInputDate(value);
		    }		    
		},
		
		{
		    key: 'delete',
		    label: "DEL",
		    class: "w-auto "
		}
	    ],
	    perPage: 5,
	    currentPage: 1,
	    sortBy: 'expiry_date',
	    sortDesc: false,
	    selected: null

	}
    },
    methods: {
	getAllEntriesFromBack: async function() {
	    try {
		const res = await BlogService.getAllEntries();

		this.entries = res.data.data;
	    }
	    catch (err) {
		this.$router.replace('Login');
	    }
	},
	showNewEntry: function() {
	    this.$refs.newEntry.show();
	},
	deleteEntry: async function(id) {
	    const result = await BlogService.deleteEntry(id);
	    tools.sendMessage(this.$store, result);
	    if (result.data.status === 0) {
		const index = this.entries.findIndex( elt => { return elt._id === id});	    
		this.entries.splice(index, 1);
	    }
	},
	showDetails: function(selected) {
	    this.$refs.entryDetails.show(selected);

	}
    },
    mounted() {
	this.getAllEntriesFromBack();
    }

}
</script>

<style>
</style>
