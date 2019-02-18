<template>
<b-modal ref="newEntryModal"
	 hide-footer
	 title="Ajout d'une publication">
  <b-form @submit="onSubmit">
    
    <!-- Publication title -->
    <b-form-group label="Titre">
      <b-form-input type="text"
		    required
		    v-model="entry.title"
		    placeholder="Entrer le titre">
      </b-form-input>
    </b-form-group>

    <!-- Publication content -->
    <b-form-group label="Contenu">
      <b-form-textarea required		    
		       v-model="entry.message"
		       :rows="3"
		       placeholder="Entrer la publication"
		       >	
      </b-form-textarea>
    </b-form-group>

    <!-- Publication date -->
    <b-form-group label="Date de début publication">
      <b-form-input type="date"
		    required		    
		    v-model="entry.publication_html"
		    placeholder="Entrer la date de publication">	
      </b-form-input>
    </b-form-group>

    <!-- Expiry date -->
    <b-form-group label="Date de fin de publication">
      <b-form-input type="date"
		    required		    
		    v-model="entry.expiry_html"
		    placeholder="Entrer la date de fin de publication">	
      </b-form-input>
    </b-form-group>

    <!-- Add images (5 maximum) -->
    <b-form-group horizontal
		  label="Photos"
		  label-class="font-weight-bold pt-0"
		  >
      <b-form-file v-model="files"
		   multiple		   
		   ref="fileInput"
		   placeholder="Ajouter un fichier..."
		   >
      </b-form-file>
    </b-form-group>

    
    <!-- Publication priority -->
    <b-form-group horizontal
		  label="Durée (min)"
		  label-class="font-weight-bold pt-0"
		  >
      <b-form-select :options="priorities"
		     required
		     v-model="entry.priority" />
      
    </b-form-group>

    

    <b-button type="submit">Ajouter</b-button>
    
  </b-form>
</b-modal>
</template>

<script>
const tools = require('./tools');
const BlogService = require('../services/BlogService').service;

export default {
    name: 'new-entry',
    props: {
	"entries": {
	    type: Array,
	    required: true
	}
    },
    data: function() {
	return {
	    entry: {
		title: "",
		message: "",
		priority: 1,
		publication_html: "2018-01-01",
		expiry_html: "2018-01-01",
	    },
	    priorities: [
		{ value: 1, text: 'Haute' },
		{ value: 2, text: 'Moyenne' },
		{ value: 3, text: 'Basse' }		    
	    ],
	    files: []

	}
    },
    methods: {
	onSubmit: async function() {
	    this.entry.publication_date = tools.toJSDate(this.entry.publication_html, "00:00");
	    this.entry.expiry_date = tools.toJSDate(this.entry.expiry_html, "00:00");

	    const res = await BlogService.createEntry(this.entry);
	    /*try {
		const res_upload_files = await BlogService.uploadFilesEntry(res.data.data, this.files);
	    }
	    catch(err) {
		console.log(typeof(err));
		console.log(err);
	    }*/
		
	    
	    if (res.data.status === 0) {
		this.entries.push(this.entry);
	    }
	    tools.sendMessageWithHTTPResponse(this.$store, res);
	    this.$refs.newEntryModal.hide();
	    
	},
	show: function() {
	    this.$refs.newEntryModal.show();
	}
    }
};
</script>
<style>
</style>
