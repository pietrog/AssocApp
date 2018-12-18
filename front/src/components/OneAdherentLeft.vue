<template>
<tr id="adherent" v-on:click="$emit('send-user-details', adherent)">
  <td>
    {{ adherent.firstname }}
  </td>
  <td>
    {{ adherent.lastname }}
  </td>
  <td><button  v-on:click.stop="$emit('move-right', adherent._id)">-></button></td>
</tr>
</template>

<script>
export default {
    name: 'one-adherent-left',
    props: {
	'adherent': Object,
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
