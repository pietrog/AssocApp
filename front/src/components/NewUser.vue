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
		emails: [],
		phone_number: []
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
	    //@todo check inputs before submiting it
	    //if (
	    //@todo envoyer les résultats au back
	    this.$emit('save-user', this.user);
	},
	addElt: function(array) {
	    array.push("");
	},
	removeElt: function(array, index) {
	    array.splice(index, 1);
	}
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
