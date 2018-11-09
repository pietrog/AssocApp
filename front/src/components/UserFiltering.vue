<template>
<div>
  Filtre: <input v-model="stringFilter"/>
</div>
</template>
<script>
export default {
    name: "user-filtering",
    data: function() {
	return {
	    stringFilter: ""
	}
    }
}
  
</script>
<style>
  
</style>
