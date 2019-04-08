<template>
<b-container fluid id="app" >
  <b-row>
    <b-col>
      <control-panel></control-panel>
    </b-col>
  </b-row>
  
  <b-row>
    <b-col>
      <transition name="slide-fade">
	<router-view class="router-main-view"></router-view>
      </transition>
    </b-col>
  </b-row>
  
  <info-panel/>
</b-container>
</template>

<script lang='js'>
import ControlPanel from './components/ControlPanel'
import InfoPanel from './components/InfoPanel.vue';

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

export default {
    name: 'app',
    components: {
	ControlPanel,
	InfoPanel
    }
}
</script>

<style>
/* All elements base style*/
* {

    font-size: 17px;

    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

</style>
