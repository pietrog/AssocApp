<template>
<div id="info-panel" v-if="messages.length > 0">
  <ul>
    <info v-for="item in messages"
	  v-bind:message="item" />
  </ul>
</div>
</template>

<script lang='js'>
import Info from './Info';

export default {
    components: {
	Info
    },
    name: 'info-panel',
    props: {
	'messages': { //info messages displayed in infopanel
	    type: Array,
	    required: true
	}

    }	
}
</script>

<style>
#info-panel {
    margin: 10px;
    padding: 5px;
    background-color: grey;
    position: fixed;
    right: 0px;
    height: 50%;

    width: 200px;

    opacity: 0.6;
}

</style>
