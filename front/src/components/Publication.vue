<template>
<div>
  {{entry.title}}
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
