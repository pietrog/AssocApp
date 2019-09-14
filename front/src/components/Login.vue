<template>
<div class="wrapper">
  <div
    class="modal modal-bg"
    :class="{ show: true }"
    >    
    <modal
      modal-with-card
      header-card-color="green"
      type="modal-login"
      card-classes="md-card-login"
      @close="loginModal = false" >

      <template slot="header">
        <md-card-header class="md-card-header-green">
          <md-button
            class="md-simple md-white md-close md-just-icon md-round modal-default-button"
            @click="loginModal = false"
            >
            <md-icon>clear</md-icon>
          </md-button>
          <h4 class="card-title">Login</h4>
          <!--div class="social-line">
            <md-button
              href="javascript:void(0)"
              class="md-just-icon md-simple md-white"
              >
              <i class="fab fa-facebook-square" />
            </md-button>
            <md-button
              href="javascript:void(0)"
              class="md-just-icon md-simple md-white"
              >
              <i class="fab fa-twitter" />
            </md-button>
            <md-button
              href="javascript:void(0)"
              class="md-just-icon md-simple md-white"
              >
              <i class="fab fa-google-plus-g" />
            </md-button>
          </div-->
        </md-card-header>
      </template>
      
      <template slot="body">
        <p
          slot="description"
          class="description"
          >
          Or Be Classical
        </p>
        <md-field
          slot="inputs"
          class="md-form-group"
          >
          <md-icon>email</md-icon>
          <label>Login</label>
          <md-input
            v-model="user"
            type="text"
            />
        </md-field>
        <md-field
          slot="inputs"
          class="md-form-group"
          >
          <md-icon>lock_outline</md-icon>
          <label>Password...</label>
          <md-input
	    v-model="password"
	    type="password"/>
        </md-field>
      </template>
      
      <template slot="footer">
        <md-button
          href="javascript:void(0)"
          class="md-simple md-success md-lg"
	  v-on:click="login()"
          >
          Connection
        </md-button>
      </template>
      
      
    </modal>
  </div>
  
  
</div>
</template>

<script lang='js'>
import AuthService from '../services/AuthenticationService';
import { Modal, FileUpload, Collapse } from "@/components";

export default {
    name: 'login',
    components: {
	Modal,
	Collapse,
	FileUpload
    },
    data: function() {
	return {
	    user: '',
	    password: '',
	    message: null
	};
    },
    methods: {
	login: async function (event) {
	    const res = await AuthService.authenticate(this.user, this.password);
	    this.message = AuthService.getMessage();
	    if (res) {
		this.$store.commit('connect');
		this.$router.replace('Welcome');
	    }	    
	}
    },
    mounted() {
	//this.$refs.loginModal.show();
    }
}
</script>

<style>

</style>
