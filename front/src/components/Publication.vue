<template>
<div>
  {{entry.title}}
  <button v-on:click="$emit('delete-entry', entry._id)" >X</button>
</div>
</template>

<script>
  export default {
      name: 'publication',
      props: {
	  'entry': {
	      type: Object,
	      required: true
	  }
      }
  }
</script>

<style >

</style>
