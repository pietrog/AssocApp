<template>
<tr id="adherent" v-on:click="$emit('send-user-details', adherent)">
  <td>
    {{ adherent.firstname }}
  </td>
  <td>
    {{ adherent.lastname }}
  </td>
  <td>
    {{ adherent.birthdate | niceDate }}
  </td>
  <td><button  v-on:click.stop="$emit('delete-user', adherent._id)">X</button></td>
</tr>
</template>

<script>
export default {
    name: 'one-adherent',
    props: {
	'adherent': Object,
    },
    filters: {
	niceDate: function(date) {
	    const jsDate = new Date(date);
	    return "" + jsDate.getDate() + "/" + jsDate.getMonth() + "/" + jsDate.getFullYear();
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
