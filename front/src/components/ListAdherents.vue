<template>
<ul id="iadherents-list" class="group">
  <one-adherent
    v-for="user in users"
    v-bind:adherent="user"
    v-bind:key="user.id">
  </one-adherent>

</ul>
</template>

<script>
import OneAdherent from './OneAdherent'
export default {
    name: 'list-adherents',
    data () {
	return {
	    msg: 'Filters',
	    users: [
		{ firstname: "Odile", lastname: "Deray" },
		{ firstname: "Yann", lastname: "Dupuis" },
		{ firstname: "Woodz", lastname: "LeFou" },
		{ firstname: "Odile", lastname: "Deray" },
		{ firstname: "Yann", lastname: "Dupuis" }
	    ]
	}
    },
    components: {
	OneAdherent
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#iadherents-list {
    float: left;
}

</style>
