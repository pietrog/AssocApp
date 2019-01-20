<template>
  
<b-container fluid>
  <b-row>
    <b-col>
      
      <b-button title="Ajouter une publication"
		v-on:click="showNewEntry">
	+
      </b-button>
      
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
		    v-on:click.stop="deleteEntry(data.item._id)">
	    X
	  </b-button>
	  
	</template>
	
      </b-table>
      
    </b-col>
  </b-row>
  <new-entry ref="newEntry"
	     v-bind:entries="entries"
	     />
  
</b-container>
  
<!--div id="blog">


  <h1 v-if="!entries || entries.length == 0">Aucune publication</h1>
  <ul v-if="entries && entries.length > 0">
    <publication v-for="current in entries"
		 v-bind:entry="current"
		 v-bind:key="current._id"
		 v-on:delete-entry="deleteEntry"/>
  </ul>

  
</div -->
</template>

<script>
import Publication from './Publication';
import NewEntry from './NewEntry';

const BlogService = require('../services/BlogService').service;
const tools = require('./tools');

export default {
    name: 'blog',
    components: {
	Publication,
	NewEntry
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
		    variant: 'danger'
		}
	    ],
	    perPage: 5,
	    currentPage: 1,
	    sortBy: 'expiry_date',
	    sortDesc: false	    

	}
    },
    methods: {
	getAllEntriesFromBack: async function() {
	    try {
		const res = await BlogService.getAllEntries();
		this.entries = res.data.data;
	    }
	    catch (err) {
		tools.sendMessage(this.$store, {status: 1, content: "Vous devez vous identifier"});
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
	showDetails: function() {
	}
    },
    mounted() {
	this.getAllEntriesFromBack();
    }

}
</script>

<style>
</style>
