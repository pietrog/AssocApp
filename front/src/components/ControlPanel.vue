<template>
  <nav id="control-panel" class="group">
    <router-link to="/users" class="base-button" v-on:click="goTo">Adhérents</router-link>
    <router-link to="/calendar" class="base-button" v-on:click="">Calendrier</router-link>
    <router-link to="/photos" class="base-button" v-on:click="" >Galerie photo</router-link>
  </nav>
</template>

<script>
  export default {
      name: 'control-panel',
      methods: {
	  goTo: function(link) {
	      this.msg = "hehe"
	  }
      }

  }
</script>

<style scoped>
#control-panel {
    background-color: #a3a3c2;
    position: relative;
    top: 0;
    right: 0;
    left: 0;
  }

  

</style>
