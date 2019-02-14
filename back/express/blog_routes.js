const express  = require('express'),
      app      = express();

const BlogAPI  = require("../components/blog").EntryAPI,
      http_h   = require('./http_handlers');

const logger   = require("../components/logger").logger;

const util = require('util');

app.get('/getAll', async (req, res) => {
    try {
	console.log("blog routes");
	console.log(req.body);
	const entries = await BlogAPI.getEntries();
	http_h.success(res, "", entries);
    }
    catch (err) {
	http_h.error(res, "Une erreur est survenue pendant le chargement des publications: " + err);
    }
});

app.post('/addEntry', async (req, res) => {
    //user object from the client side
    const entry = req.body.entry;
    try {
	let pub_date = new Date(entry.publication_date);
	pub_date = pub_date.getTime();
	let exp_date = new Date(entry.expiry_date);
	exp_date = exp_date.getTime();
	
	const result = await BlogAPI.createNewEntry(entry.title,
						    pub_date,
						    exp_date,
						    entry.message,
						    entry.priority);
	http_h.success(res, "La publication " + result.title + " a été ajoutée au blog", result._id);
    }
    catch(err) {
	http_h.error(res,  entry.title + " non ajoutée: " + err);
    }
});

app.post('/uploadFiles', async(req, res) => {

    //process files
    const files = req.files.files; //the second files comes from the server/multipart form
    const id = req.body.data;
    const nb_files = files.length;
    
    if (nb_files === 0) {
	http_h.success(res, "Aucun fichier téléchargé");
	return;
    }
    
    //mv each file to dl folder
    files.forEach(async (file) => {
	const name = file.name;
	logger.info('Copy file named ' + name + ' on the server');
	await file.mv('./uploads/' + name);
    });

    //process data (entry id)    
    http_h.success(res, nb_files + " fichiers téléchargés");
    
});

app.delete('/:id', async (req, res) => {
    try {
	const result = await BlogAPI.removeEntryByID(req.params.id);
	const message = result.title + ' a été supprimé'
	http_h.success(res, message);
    }
    catch (err) {
	http_h.error(res, "La suppression a échouée"+err);
    }
});


module.exports = app;
