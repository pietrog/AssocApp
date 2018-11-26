<template>
<tr id="adherent" v-on:click="$emit('send-user-details', adherent)">
  <td>
    {{ adherent.firstname }}
  </td>
  <td>
    {{ adherent.lastname }}
  </td>
  <td v-if="!readOnly">
    {{ adherent.birthdate | niceDate }}
  </td>
  <td v-if="!readOnly"><button  v-on:click.stop="$emit('delete-user', adherent.id)">X</button></td>
</tr>
</template>

<script>
export default {
    name: 'one-adherent',
    props: {
	'adherent': Object,
	'read-only': {type: Boolean, default: true}
    },
    filters: {
	niceDate: function(date) {
	    return "" + date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
	}

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#adherent {
    background-color: coral;
}

#adherent:hover {
    background-color: white;
    cursor: pointer;
}

.show-details {
    display: inline-block;
}

</style>
