<template>
  <nav id="control-panel" class="group display">
    <router-link to="/users" class="base-button" v-on:click="goTo">Adhérents</router-link>
    <router-link to="/calendar" class="base-button" v-on:click="">Calendrier</router-link>
    <router-link to="/photos" class="base-button" v-on:click="">Galerie photo</router-link>
    {{msg}}
  </nav>
</template>

<script>
  export default {
      name: 'control-panel',
      data() {
	  return {
	      msg: "coucou"
	  }
      },
      methods: {
	  goTo: function(link) {
	      this.msg = "hehe"
	  }
      }

  }
</script>

<style scoped>
#control-panel {
    background-color: #eaeaed;
    width: 100%;
  }

  

</style>
