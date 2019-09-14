<template>
<div class="wrapper">
  <parallax
    class="page-header header-filter clear-filter back-img"
    parallax-active="true"
    :style="headerStyle"
    >
    <div class="md-layout">
      <div class="md-layout-item">
        <div class="image-wrapper">
          <div class="brand">
            <h1>
              Taekwondo
            </h1>
            <span class="pro-badge">
              COMB
            </span>
          </div>
        </div>
      </div>
    </div>
  </parallax>
  
  <div class="section">
    <div class="container">
      <md-button class="md-fab md-fab-top-right md-round md-danger"
		 v-on:click="showNewUser"
		 >
	<md-icon>add</md-icon>
      </md-button>
      
      <div class="main ">
        <div class="md-layout">
	  
	  <div class="md-layout-item">
	    <md-field>
	      <label for="login">Pseudo</label>
	      <md-input name="login"
			id="login"
			v-model="login"
			/>
	    </md-field>
	  </div>

	  <div class="md-layout-item">
	    <md-field>
	      <label for="pwd">Mot de passe</label>
	      <md-input name="pwd"
			id="pwd"
			v-model="password"
			/>
	    </md-field>
	  </div>

	  <div class="md-layout-item">
	    <md-field>
	      <label for="email">Adresse e-mail</label>
	      <md-input name="email"
			id="email"
			v-model="email"
			/>
	    </md-field>
	  </div>


	</div>
      </div>
    </div>
  </div>

</div>
</template>

<script>
import AuthService from '../services/AuthenticationService';

export default {
    name: 'admin',
    data: function() {
	return {
	    login: AuthService.getUser(),
	    password: "",
	    email: AuthService.getEmail()
	}
    },
    methods: {
	updateLogin: async function() {
	    await AuthService.updateLogin(this.login);
	},
	updatePassword: async function() {
	    await AuthService.updatePassword(this.password);
	},
	updateEmail: async function() {
	    await AuthService.updateEmail(this.email);
	}
	
	
    },
    
    props: {
	image: {
	    type: String,
	    default: require("@/assets/img/back-taek-dojo-2.jpg")
	}
	
    },
    
    
    computed: {
	headerStyle() {
	    return {
		backgroundImage: `url(${this.image})`
	    };
	}
    },
    
    mounted() {
    }
};
</script>

<style>
</style>
