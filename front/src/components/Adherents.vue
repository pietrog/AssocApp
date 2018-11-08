<template>
<div id="child-view" class="group">
  <div id="toolbar-view">{{msg}}</div>
  <list-adherents id="main-view"></list-adherents>
</div>
</template>

<script>
import ListAdherents from './ListAdherents';


export default {
    name: 'adherents',
    data: function () {
	return {
	    msg: 'Filters'
	}
    },
    components: {
	ListAdherents
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
