<template>
<div id="adherents" class="group display">
  <div id="exploration-bar" class="display">{{msg}}</div>
  <ddd class="display"></ddd>
</div>
</template>

<script>
import ddd from './ListAdherents';
  
export default {
    name: 'adherents',
    data () {
	return {
	    msg: 'Filters'
	}
    },

    components: {
	ddd
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#adherents {
    width: 100%;
    height: 70vh;
}

#exploration-bar {
    float: left;
    width: 19%;
    height: 98%;
}

#main-view {
    float: left;
    width: 79%;
    height: 98%;
}

</style>
