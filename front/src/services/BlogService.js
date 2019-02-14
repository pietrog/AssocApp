'use strict';

const util = require('util');
//import BackServerProxy from './BackServerProxy';
const proxy = require('./BackServerProxy').proxy;

class BlogService extends proxy {
    
    constructor() {
	super('/blog');
    }

    getAllEntries() {
	return this._get('/getAll');
    }

    createEntry(entry) {	
	return this._post('/addEntry', {entry: entry});
    }

    uploadFilesEntry(entry_id, files) {
	return this._upload_files('/uploadFiles', entry_id,  files);
    }

    deleteEntry(id) {
	return this._delete('/', id);
    }

    updateEntry(entry) {
	return this._update('/update', {entry: entry});
    }
};

module.exports.service = new BlogService();
