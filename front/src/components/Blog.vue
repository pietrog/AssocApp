<template>
<div id="blog">

  <button title="Ajouter une publication" class="fixed-button" v-on:click="displayNewEntry">+</button>
  <h1 v-if="!entries || entries.length == 0">Aucune publication</h1>
  <ul v-if="entries && entries.length > 0">
    <publication v-for="current in entries"
		 v-bind:entry="current"
		 v-bind:key="current._id" />		 
  </ul>

  <new-entry v-if="displayedNewEntry"
	     v-on:hide-new-entry="displayedNewEntry = false"
	     v-on:save-entry="createEntry"/>
  
</div>
</template>

<script>
import Publication from './Publication';
import NewEntry from './NewEntry';

const BlogService = require('../services/BlogService').service;

export default {
    name: 'blog',
    components: {
	Publication,
	NewEntry
    },
    data: function() {
	return {
	    entries: [],
	    displayedNewEntry: false
	}
    },
    methods: {
	getAllEntriesFromBack: async function() {
	    try {
		const res = await BlogService.getAllEntries();
		console.log(res);
		this.entries = res.data.data;
	    }
	    catch (err) {
		this.messages.push({status: 1, content: "Vous devez vous identifier"});
	    }
	},
	displayNewEntry: function() {
	    this.displayedNewEntry = true;
	},
	createEntry: async function(entry) {
	    const res = await BlogService.createEntry(entry);
	    console.log(res);
	    this.displayedNewEntry = false;
	}
    },
    props: {
	'messages': { //info messages displayed in infopanel
	    type: Array,
	    required: true
	}
    },
    mounted() {
	this.getAllEntriesFromBack();
    }

}
</script>

<style>
#blog {
    float: left;
    width: 98%;
}
</style>
