<template>
<div id="back-popup-box" v-on:click="hide">
  <div id="popup-box" >
    Ajout User
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
	<td><input type="date" v-model="user.birthdate" /></td>
      </tr>
      <tr>
	<td>Emails<button v-if="user.emails.length < 3" v-on:click="addMail">+</button></td>
	<td>
	  <ul v-for="(mail, index) in user.emails">
	    <li><input type="email" v-model="user.emails[index]"/><button v-on:click="removeMail(index)">-</button></li>
	  </ul>
	</td>
      </tr>
    </table>
    <button class= "base-button" v-on:click="saveAndExit">Ajouter</button>
  </div>
</div>
</template>

<script>
export default {
    name: 'new-user',
    data: function() {
	return {
	    user: {
		firstname: "",
		lastname: "",
		birthdate: "2005-01-01",
		emails: []
	    },
	}
    },
    methods: {
	//hide details vue when user clicks on back user details div
	hide: function(event) {
	    if (event.srcElement.id === "back-popup-box")
		this.$emit('hide-new-user');
	},
	saveAndExit: function() {
	    //check inputs before submiting it
	    //if (
	    //@todo envoyer les résultats au back
	    this.$emit('save-user', this.user);
	},
	addMail: function() {
	    this.user.emails.push("");
	},
	removeMail: function(index) {
	    this.user.emails.splice(index, 1);
	}
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
