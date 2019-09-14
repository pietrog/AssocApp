<template>
<div>
  <router-view name="header" />
  <router-view class="router-main-view"></router-view>
  <router-view name="footer" />
</div>
</template>

<script lang='js'>
import ControlPanel from './components/ControlPanel'
import InfoPanel from './components/InfoPanel.vue';

export default {
    name: 'app',
    components: {
	ControlPanel,
	InfoPanel,
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
