<template>
<div id="app">
  <control-panel/>
  <router-view class="main-view"/>
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
* {
    box-sizing: border-box;
    font-size: 25px;
    text-decoration: none;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
    /* Set a specific height */
    height: 100%;
    background-color: #c2c2d6;
}

/*  */
a {
    float: left;
}

.main-view {
    margin: 2vh;
}

.base-button {
    width: 15%;
    text-align: center;
}
.base-button:hover {
    background-color: white;
    text-decoration: none;
    zoom: 1.15;
}

/* CSS default class for router-link when active */
.router-link-active {
    background-color: #c2c2d6;
    text-decoration: none;
    zoom: 1.15;
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
    margin: 1vh;
}

.display-blue {
    border: 2px solid blue;
    margin: 1vh;
}

.display-black {
    border: 2px solid black;
    margin: 1vh;
}


</style>
