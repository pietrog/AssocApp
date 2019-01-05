import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);



const store = new Vuex.Store({
    state: {
	isConnected: false //user connection state (when the page is reloaded, refresh it too)
    },
    mutations: {
	connect (state) {
	    state.isConnected = true;
	},
	deconnect (state) {
	    state.isConnected = false;
	}
    }
});

export default store;
