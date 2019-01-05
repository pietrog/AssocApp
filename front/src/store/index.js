import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);



const store = new Vuex.Store({
    state: {
	isConnected: false, //user connection state (when the page is reloaded, refresh it too)
	messages: []
    },
    mutations: {
	/*
	 * Connect/deconnect methods for isConnect variable
	 */
	connect (state) {
	    state.isConnected = true;
	},
	deconnect (state) {
	    state.isConnected = false;
	},
	/*
	 * push info messages
	 */
	pushMessage(state, message) {
	    state.messages.push(message);
	},
	popMessage(state) {
	    state.messages.shift();
	}
    }
});

export default store;
