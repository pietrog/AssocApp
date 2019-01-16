<template>
<b-tr id="adherent" v-on:click="$emit('send-user-details', adherent)">
  <b-td>
    {{ adherent.firstname }}
  </b-td>
  <b-td>
    {{ adherent.lastname }}
  </b-td>
  <b-td>
    {{ adherent.birthdate | niceDate }}
  </b-td>
  <b-td><button  v-on:click.stop="$emit('delete-user', adherent._id)">X</button></b-td>
</b-tr>
</template>

<script>
const tools = require('./tools');

export default {
    name: 'one-adherent',
    props: {
	'adherent': Object,
    },
    filters: {
	niceDate: function(d) {
	    return tools.toReadableDate(d);
	}
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
