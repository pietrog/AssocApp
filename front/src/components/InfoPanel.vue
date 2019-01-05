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
    computed: {
	'messages': { //info messages displayed in infopanel
	    type: Array,
	    required: true
	}

    },
    computed: {
	messages() {
	    return this.$store.state.messages;
	}
    },
    data: function() {
	return {
	    timeoutMessages: 5000
	};
    },    
    methods: {
	purgeMessages: function() {
	    if (this.$store.state.messages.length > 0)
		setTimeout(() => {
		    this.$store.commit('popMessage');
		    this.purgeMessages();
		}, this.timeoutMessages);
	}	
    },
    beforeUpdate() {
	this.purgeMessages();
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
