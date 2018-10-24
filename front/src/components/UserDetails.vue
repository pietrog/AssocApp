<template>
<div id="back-user-details" v-if="user.firstname" v-on:click="hide" v-bind:class="{'hidden': hiddenDetails}">
  <div id="user-details" >
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
  </div>
</div>
</template>

<script>
export default {
    name: 'user-details',
    data() {
	return {
	    hiddenDetails: false
	}
    },
    props: ['user'],
    methods: {
	//hide details vue when user clicks on back user details div
	hide: function(event) {
	    if (event.srcElement.id === "back-user-details")
		this.hiddenDetails = true;
	}
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#back-user-details {
    z-index: 100;
    position: absolute;
    top: 0%;
    bottom: 0%;
    left: 0%;
    right: 0%;

    background-color: rgba(31, 31, 46, 0.5);
    /*filter: blur(5px);*/
}

#user-details {
    display: block;
    z-index: 150;
    position: absolute;
    top: 20%;
    bottom: 20%;
    left: 20%;
    right: 20%;

    background-color: black;
    color: white;
}

.hidden {
    display: none;
}

</style>
