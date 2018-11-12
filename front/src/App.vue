<template>
<div id="app">
  <control-panel/>
  <router-view class="router-main-view"/>
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
/* All elements base style*/
* {
    /* box sizing includes margin */
    box-sizing: border-box;

    /* default font style */
    font-size: 22px;
    text-decoration: none;
    text-align: center;
    
    /* Default font */
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

}

/* Global body style */
body {
    /* Set a specific height */
    height: 100%;
    background-color: #c2c2d6;
}

/*  */
a {
    float: left;
}

.router-main-view {
    margin: 2vh;
}

/* Button base style */ 
.base-button {
    width: 15%;
    text-align: center;
}
base-button:hover {
    background-color: white;
    text-decoration: none;
    zoom: 1.05;
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

/* Base style for all child views coming inside router-view. These child views include a toolbar and a mainview */
#child-view {
    left: 0;
    right: 0;
}

#toolbar-view {
    float: left;
    width: 19%;
}

#main-view {
    float: left;
    width: 78%;
    border-left: 2px solid lightgrey;
}

/* Base style for all popup style box */
#back-popup-box {
    z-index: 100;
    position: absolute;
    top: 0%;
    bottom: 0%;
    left: 0%;
    right: 0%;

    background-color: rgba(31, 31, 46, 0.5);
    /*filter: blur(5px);*/
}

#popup-box {
    display: block;
    z-index: 150;
    position: absolute;
    top: 20%;
    bottom: 20%;
    left: 20%;
    right: 20%;

    background-color: black;
    color: white;
}

.hidden {
    display: none;
}


</style>
