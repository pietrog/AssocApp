<template>
<li v-bind:class="{ error: message.status === 1, success: message.status === 0 }">{{message.content}}</li>
</div>
</template>

<script lang='js'>

export default {
    name: 'info',
    props: {
	'message': Object
    }	
}
</script>

<style>
.error {
    background-color: red;
}
.success {
    background-color: green;
}
</style>
