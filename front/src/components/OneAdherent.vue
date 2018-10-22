<template>
  <li>
    {{ adherent.firstname }} - {{ adherent.lastname }}
  </li>
</template>

<script>
export default {
    name: 'one-adherent',
    props: ['adherent']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#iadherents-list {
    float: left;
}

</style>
