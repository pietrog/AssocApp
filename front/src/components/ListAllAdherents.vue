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
          <div class="md-layout-item md-small-size-100">
	    
	    <md-table v-model="users"
		      md-card >

	      <md-table-toolbar>		
		<h1 class="md-title">Liste des membres</h1>
	      </md-table-toolbar>
				  
	      <md-table-row slot="md-table-row" slot-scope="{ item }">
		
		<md-table-cell md-label="Prenom"
			       md-sort-by="firstname">
		  {{ item.firstname }}
		</md-table-cell>

		<md-table-cell md-label="Nom"
			       md-sort-by="lastname">
		  {{ item.lastname }}
		</md-table-cell>
		
		<md-table-cell md-label="Date de naissance"
			       md-sort-by="birthdate">
		  {{ item.jsBirthdate.getFullYear() }}
		</md-table-cell>

		<md-table-cell>
                  <md-button
		    
		    class="md-just-icon md-sm md-success"
		    @click="showDetails(item)"
                    >
                    <md-icon>edit</md-icon>
                  </md-button>
                  <md-button

		    class="md-just-icon md-sm md-danger"
		    @click="deleteUser(item._id)"
                    >
                    <md-icon>close</md-icon>
                  </md-button>
                </md-table-cell>

		
	      </md-table-row>
	      
	    </md-table>
	    
          </div>
        </div>
      </div>
    </div>
  </div>

  <new-user ref="newUserComponent"
	    v-bind:users="users"/>
  <UserDetails ref="editUserComponent"
	       v-bind:users="users" />

</div>
</template>

<script>
import NewUser from './NewUser';
import UserDetails from './UserDetails';

//import Mixins from "@/plugins/basicMixins";

const tools = require('./tools');

const UserService = require('../services/UserService').service;
const util = require('util');

export default {
    name: 'list-all-adherents',
    data: () => ({
	
	users: [],
	user: {},
	fields: [
	    {
		key: "firstname",
		label: "Prénom",
		sortable: true
	    },
	    {
		key: "lastname",
		label: "Nom",
		sortable: true
	    },
	    {
		key: "jsBirthdate",
		label: "Année de naissance",
		sortable: true,
		formatter: (value, key, item) => {
		    return value.getFullYear();
		}
	    },
	    {
		key: "firstname",
		label: "Prénom"
	    },
	    {
		key: "delete",
		label: "Supp",
		class: "w-auto "
	    }
	],
	stringFilter: "",
	dateFilter: 0,
	currentPage: 1,
	perPage: 10,
	sortDesc: false,
	sortBy: "lastname"
    }),

//    mixins: [Mixins.VerticalNav, Mixins.HeaderImage],
    
    methods: {
	getAllAdherentsFromBack: async function() {
	    try {
		const res = await UserService.getAllStudents();
		const users = res.data.data;
		users.forEach((elt) => {
		    elt.jsBirthdate = new Date(elt.birthdate);
		});
		this.users = res.data.data;
	    }
	    catch(err) {
		this.$router.replace('Login');
		//tools.sendMessage(this.$store, {status: 1, content: 'Vous devez vous authentifier'});
	    }
	},
	deleteUser: async function(id) {
	    const result = await UserService.deleteUser(id);
	    tools.sendMessageWithHTTPResponse(this.$store, result);
	    if (result.data.status === 0) {
		const index = this.users.findIndex( elt => { return elt._id === id});	    
		this.users.splice(index, 1);
	    }
	},
	filterUser: function(current) {
	    let filterResult = true;
	    filterResult &= tools.stringFilter([current.firstname, current.lastname], this.stringFilter);
	    filterResult &= tools.dateFilter(current.jsBirthdate, this.dateFilter);
	    return filterResult;
	},
	showDetails: function(item) {
	    if (!item.birthdateHtml) {
		item.birthdateHtml = tools.toInputDate(item.birthdate);
	    }
	    this.$refs.editUserComponent.show(item);
	},
	showNewUser: function() {
	    this.$refs.newUserComponent.show();
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

    components: {
	NewUser,
	UserDetails
    },

    mounted() {
	this.getAllAdherentsFromBack();
    }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.section-download {
  .md-button + .md-button {
    margin-left: 5px;
  }
}

.vertical-nav-active {
  display: block;
}

@media all and (min-width: 991px) {
  .btn-container {
    display: flex;
  }
}
@media all and (max-width: 768px) {
  .vertical-nav-active {
    display: none;
  }
}

.mb-0 {
  padding-bottom: 0 !important;
}

#morphing-cards {
  padding-top: 70px;
}

.back-img {
    background-size: contain;
    border: 2px solid;
}

</style>
