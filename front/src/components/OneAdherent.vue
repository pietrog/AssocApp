<template>
<tr id="adherent">
  <td v-on:click="displayUser">
    {{ adherent.firstname }}
  </td>
  <td>
    {{ adherent.lastname }}
  </td>
  <td>
    {{ adherent.birthday }}
  </td>
</tr>
</template>

<script>
export default {
    name: 'one-adherent',
    props: ['adherent'],
    methods: {
	displayUser: function() {
	    console.log( "coucou");
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
