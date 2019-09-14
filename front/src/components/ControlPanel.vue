<template>
<md-toolbar
  id="toolbar"
  md-elevation="0"
  class="md-fixed "
  :class="{
	  'md-transparent': navbarTransparent
	  }"  
  >

  <div class="md-toolbar-row md-collapse-lateral">

    <!-- Left of the row  -->
    <div class="md-toolbar-section-start">
      <h1 class="md-title">
	{{ appTitle }}
      </h1>
    </div>

    <!-- Right of the row  -->        
    <div class="md-toolbar-section-end">
      <md-button
	class="md-just-icon md-simple md-toolbar-toggle"
	:class="{ toggled: toggledClass }"
	@click="toggleNavbarMobile()"
	>
	<span class="icon-bar" />
	<span class="icon-bar" />
	<span class="icon-bar" />
      </md-button>

      
      <div class="md-collapse">
	<div class="md-collapse-wrapper">
	  <mobile-menu nav-mobile-section="false">
              <!-- Here you can add your items from the section-start of your toolbar -->
            </mobile-menu>

	  <md-list>
	    <li>
	      <a
                href="javascript:void(0)"
                class="md-list-item-router md-list-item-container md-button-clean dropdown"
                >
		<div class="md-list-item-content">
		  <md-button class="md-button md-button-link md-white md-simple">
		    <router-link to="/users">Gestion des membres</router-link>
		  </md-button>
		</div>
	      </a>
	    </li>
	    <li>
	      <a
		href="javascript:void(0)"
                class="md-list-item-router md-list-item-container md-button-clean dropdown"
                >
		<div class="md-list-item-content">		  
		  <md-button class="md-button md-button-link md-white md-simple">
		    <router-link to="/calendar">Planning des cours</router-link>
		  </md-button>
		</div>
	      </a>
	    </li>
	    <li>
	      <a
		href="javascript:void(0)"
                class="md-list-item-router md-list-item-container md-button-clean dropdown"
                >
		<div class="md-list-item-content">		  		  
		  <md-button class="md-button md-button-link md-white md-simple">
		    <router-link to="/admin">Admin Panel</router-link>
		  </md-button>
		</div>
	      </a>
	    </li>
	    <li>
	      <a
		href="javascript:void(0)"
                class="md-list-item-router md-list-item-container md-button-clean dropdown"
                >
		<div class="md-list-item-content">		  		  
		  
		  <md-button v-if="isConnected"
			     class="md-danger"
			     v-on:click="logout">
		    Deconnection
		  </md-button>
		</div>
	      </a>
	    </li>
	  </md-list>
	  
	  
	</div>
      </div>
    </div>
    
  </div>
</md-toolbar>

</template>

<script>
//const AuthService = require('../services/AuthenticationService').service;
import AuthService from'../services/AuthenticationService';
import MobileMenu from '@/layout/MobileMenu';

export default {
    name: 'control-panel',
    components: {
	MobileMenu
    },
    data() {
	return {
	    toggledClass: false,
	};
    },
    computed: {
	isConnected() {
	    return this.$store.state.isConnected;
	}
    },
    methods: {
	logout: function() {
	    AuthService.logout();
	    this.$store.commit('deconnect');
	    this.$router.replace('Login');
	}
    },
    props: {
	navbarTransparent: {
	    type: Boolean,
	    default: true
	},
	appTitle: {
	    type: String,
	    default: "COMB Taekwondo"
	}
	
    }
}
</script>

<style>
</style>
