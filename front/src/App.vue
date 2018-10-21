<template>
<div id="app">
  <control-panel/>
  <router-view/>
  <contact-panel/>
</div>
</template>

<script lang='js'>
import ControlPanel from './components/ControlPanel'
import ContactPanel from './components/ContactPanel'
import ListAdherents from './components/ListAdherents';

export default {
    name: 'app',
    components: {
	ContactPanel,
	ControlPanel,
	ListAdherents
	}
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
    /* Set a specific height */
    height: 100%;
    margin: 30px;
    background: linear-gradient(0.25turn, #3f87a6, #ebf8e1, #f69d3c);    
}

/*  */
a {
    float: left;
}

.base-button {
    background-color: #cddef9;
    margin: 0.5%;
    padding: 0.3%;
    width: 15%;
    border-radius: 6px;
    text-align: center;
}

/* group class, can contain floating elements (cf https://lear.shayhowe.com/advanced-html-css/detailed-css-positioning/ */
.group:before,
.group:after {
    content: "";
    display:table;
}

.group:after {
    clear: both;
}

.display {
    border: 2px solid red;
    margin: 5px;
}

.display-blue {
    border: 2px solid blue;
    margin: 5px;
}


</style>
