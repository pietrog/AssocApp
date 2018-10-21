<template>
<ul id="iadherents-list" class="group display-blue">
  <li v-for="user in users">
    {{ user.firstname }} - {{ user.lastname }}
  </li>
</ul>
</template>

<script>
export default {
    name: 'ddd',
    data () {
	return {
	    msg: 'Filters',
	    users: [
		{ firstname: "Odile", lastname: "Deray" },
		{ firstname: "Yann", lastname: "Dupuis" },
		{ firstname: "Woodz", lastname: "LeFou" }
	    ]
	}
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#iadherents-list {
    float: left;
    width: 60%;
    height: 98%;
}

</style>
