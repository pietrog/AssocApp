<template>
<div id="back-popup-box" v-if="user.firstname" v-on:click="hide">
  <div id="popup-box" >
    <table>
      <tr>
	<td>Prenom</td>
	<td><input v-model="user.firstname" /></td>
      </tr>
      <tr>
	<td>Nom de famille</td>
	<td><input v-model="user.lastname" /></td>
      </tr>
      <tr>
	<td>Date de naissance</td>
	<td><input type="date" v-model="birthdate_html" /></td>
      </tr>
      <tr>
	<td>Emails<button v-if="user.emails.length < 3" v-on:click="addElt(user.emails)">+</button></td>
	<td>
	  <ul v-for="(mail, index) in user.emails">
	    <li><input type="email" v-model="user.emails[index]"/><button v-on:click="removeElt(user.emails, index)">-</button></li>
	  </ul>
	</td>
      </tr>
      <tr>
	<td>Téléphones<button v-if="user.phone_number.length < 3" v-on:click="addElt(user.phone_number)">+</button></td>
	<td>
	  <ul v-for="(phone, index) in user.phone_number">
	    <li><input type="tel" v-model="user.phone_number[index]"/><button v-on:click="removeElt(user.phone_number, index)">-</button></li>
	  </ul>
	</td>
      </tr>
      
    </table>
    <button class= "base-button" v-on:click="saveAndExit">Appliquer</button>
  </div>
</div>
</template>

<script>
const UserService = require('../services/UserService').service;
const tools = require('./tools');
const util = require('util');

export default {
    name: 'user-details',
    props: {
	'user': {
	    type: Object,
	    require: true
	}
    },
    methods: {
	//hide details vue when user clicks on back user details div
	hide: function(event) {
	    if (event.srcElement.id === "back-popup-box")
		this.$emit('hide-user-details')
	},
	saveAndExit: function() {
	    const finalDate = tools.toJSDate(this.birthdate_html);
	    this.user.birthdate = finalDate.getTime();
	    UserService.updateUser(this.user);
	    this.$emit('hide-user-details')
	},
	addElt: function(array) {
	    array.push("");
	},
	removeElt: function(array, index) {
	    array.splice(index, 1);
	}

    },
    created: function() {
	if (this.user.firstname && !this.user.birthdate_html){
	    this.birthdate_html = tools.toInputDate(this.user.birthdate);
	}
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
