// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from '@/App';
import router from '@/router';
import store from '@/store';


import MaterialKit from "@/plugins/material-kit";
//import VueMaterial from "vue-material"; //import full bundle of vue material
//import "vue-material/dist/vue-material.min.css";
//

import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
//import 'vue-material/dist/theme/all.scss' // This line here
/*@import 'vue-material/dist/theme/engine'; // Import the theme engine

@include md-register-theme("default", (
  primary: md-get-palette-color(blue, A200), // The primary color of your application
  accent: md-get-palette-color(red, A200), // The accent or secondary color
  theme: dark // This can be dark or light
));

@import "vue-material/dist/theme/all";*/ // Apply the theme

Vue.use(MaterialKit);

Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App
		},
    template: '<App/>'
})
