<template>
  <nav id="control-panel" class="group">
    <router-link to="/users" class="base-button">Adhérents</router-link>
    <router-link to="/calendar" class="base-button">Calendrier</router-link>
    <router-link to="/photos" class="base-button">Galerie photo</router-link>
  </nav>
</template>

<script>
  export default {
      name: 'control-panel',
  }
</script>

<style scoped>
#control-panel {
    background-color: #00539C;
    position: relative;
    top: 0;
    right: 0;
    left: 0;
}

  

</style>
