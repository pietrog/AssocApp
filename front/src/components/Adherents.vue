<template>
<div id="adherents" class="group">
  <div id="exploration-bar" class="">{{msg}}</div>
  <list-adherents id="main-view" class=""></list-adherents>
  <user-details></user-details>
</div>
</template>

<script>
import ListAdherents from './ListAdherents';
import UserDetails from './UserDetails';

export default {
    name: 'adherents',
    data () {
	return {
	    msg: 'Filters'
	}
    },
    components: {
	ListAdherents,
	UserDetails
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

#adherents {
    left: 0;
    right: 0;
}

#exploration-bar {
    float: left;
    width: 19%;
}

#main-view {
    float: left;
    width: 78%;
    border-left: 2px solid lightgrey;
}

</style>
