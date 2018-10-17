<template>
<div id="app">
  <control-panel/>
  <footer/>
  <router-view/>

  <img src="./assets/logo.png">
</div>
</template>

<script lang='js'>
  import ControlPanel from './components/ControlPanel';
  import Footer from './components/Footer';
  
export default {
    name: 'app',
    components: {
	ControlPanel,
	Footer
	}
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
