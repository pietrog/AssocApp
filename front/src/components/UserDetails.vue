<template>
<div id="back-popup-box" v-if="user.firstname" v-on:click="hide" v-bind:class="{'hidden': hiddenDetails}">
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
	<td><input/></td>
      </tr>
    </table>
    <button class= "base-button" v-on:click="saveAndExit">Appliquer</button>
  </div>
</div>
</template>

<script>
export default {
    name: 'user-details',
    data: function() {
	return {
	    hiddenDetails: false
	}
    },
    props: ['user'],
    methods: {
	//hide details vue when user clicks on back user details div
	hide: function(event) {
	    if (event.srcElement.id === "back-popup-box")
		this.hiddenDetails = true;
	},
	saveAndExit: function() {
	    //@todo envoyer les résultats au back
	    //this.hiddenDetails = true;
	    this.hiddenDetails = true;	    
	}
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
