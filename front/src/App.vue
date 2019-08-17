<template>
<div id="app" >
  <side-bar
    title="AssocApp"
    v-bind:sidebarLinks="[coucou, caca]"
    >
  </side-bar>

  <div>
    <div>
      <control-panel></control-panel>
    </div>
  </div>
  
  <div>
    <div>
      <transition name="slide-fade">
	<router-view class="router-main-view"></router-view>
      </transition>
    </div>
  </div>
  
  <info-panel/>
</div>
</template>

<script lang='js'>
import ControlPanel from './components/ControlPanel'
import InfoPanel from './components/InfoPanel.vue';
import SideBar from '@/components/vue-material/SidebarPlugin/SideBar';

export default {
    name: 'app',
    components: {
	ControlPanel,
	InfoPanel,
	SideBar
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
