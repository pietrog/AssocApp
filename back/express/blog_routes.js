const express  = require('express'),
      app      = express();

const BlogAPI  = require("../components/blog").EntryAPI,
      http_h   = require('./http_handlers');


const util = require('util');

app.get('/getAll', async (req, res) => {
    try {
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
	const result = await BlogAPI.createNewEntry(entry.title, entry.publicationDate, entry.expiryDate,
						     entry.message, entry.priority);
	http_h.success(res, "La publication " + result.title + " a été ajoutée au blog", result._id);
    }
    catch(err) {
	http_h.error(res,  entry.title + " non ajoutée: " + err);
    }
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
