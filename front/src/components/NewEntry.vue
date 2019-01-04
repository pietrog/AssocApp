<template>
<div id="back-popup-box" v-on:click="hide">
  <div id="popup-box" >
    Ajout Publication
    <table>
      <tr>
	<td>Titre</td>
	<td><input v-model="entry.title" /></td>
      </tr>
      <tr>
	<td>Message</td>
	<td><input v-model="entry.message" /></td>
      </tr>
      <tr>
	<td>Date de publication</td>
	<td><input type="date" v-model="entry.publication_html" /></td>
      </tr>
      <tr>
	<td>Date d'expiration</td>
	<td><input type="date" v-model="entry.expiration_html" /></td>
      </tr>
      <tr>
	<td>Priorité</td>
	<td>
	  <select v-model="entry.priority">
	    <option value="1">Haute</option>
	    <option value="2">Moyenne</option>
	    <option value="3">Basse</option>
	  </select>
	</td>
      </tr>
    </table>
    <button class= "base-button" v-on:click="saveAndExit">Ajouter</button>
  </div>
</div>
</template>

<script>
const tools = require('./tools');

export default {
    name: 'new-entry',
    data: function() {
	return {
	    entry: {
		title: "",
		message: "",
		priority: 1,
		publication_html: "2018-01-01",
		expiration_html: "2018-01-01",
	    },
	}
    },
    methods: {
	//hide details vue when user clicks on back user details div
	hide: function(event) {
	    if (event.srcElement.id === "back-popup-box")
		this.$emit('hide-new-entry');
	},
	saveAndExit: function() {
	    this.entry.publication_date = tools.toJSDate(this.entry.publication_html, "00:00");
	    this.entry.expiration_date = tools.toJSDate(this.entry.expiration_html, "00:00");
	    this.$emit('save-entry', this.entry);
	}
    }
};
</script>
<style>
</style>
