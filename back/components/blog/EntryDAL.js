'use strict';

const EntrySchema = require('./EntrySchema'),
      assert = require('assert').strict,
      error_messages = require('./error_messages'),
      Logger = require('../logger').logger;

const util = require('util');

class EntryDAL {

    constructor() {}

    /**
     *
     */
    getEntryByName(title) {
	assert.equal(typeof(title), 'string', 'Title should be a string');

	return EntrySchema.findOne({title: title});
    }

    /**
     *
     */
    async createNewEntry(title, publicationDate, expiryDate, message, priority, pictureArray, otherDocArray) {

	const _pubDate = publicationDate || -1;
	const _expDate = expiryDate || -1;
	
	assert.equal(typeof(title), 'string', 'Title should be a string');
	assert.equal(typeof(message), 'string', 'Message should be a string');
	assert.equal(typeof(priority), 'number', 'priority should be 1, 2 or 3');

	try {
	    const sameTitle = await EntrySchema.findOne({title: title});
	    if (sameTitle != null) {
		Logger.info('Entry with same title already exists');
		return null;
	    }

	    const entry = {
		title: title,
		message: message,
		priority: priority,
		creation_date: Date.now(),
		publication_date: _pubDate,
		expiry_date: _expDate,
		pictures: pictureArray,
		other_documents: otherDocArray		
	    };

	    const entry_db = new EntrySchema(entry);
	    const entry_inserted = await entry_db.save();
	    Logger.info('Entry '+ title + ' has been created');
	    return entry_inserted;
	}
	catch (err) {
	    Logger.error('Error occured while creating a new entry: ' + err);
	    throw err;
	}	
    }


    /**
     * 
     * @param {number} [minPublicationDate] Get all entries having a publication date greater or equal to minPublicationDate
     * @param {number} [minCreationDate] Get all entries having a creation date greater or equal to minCreationDate
     * @param {number} [maxExpiryDate] Get all entries having an expiry date less or equal to maxExpiryDate
     */
    async getAllEntry(minPublicationDate, minCreationDate, maxExpiryDate) {

	const query = {};
	if (minPublicationDate != null) {
	    assert.equal(typeof(minPublicationDate), 'number', 'Start pub date should be a number');
	    query.publication_date = { $gte: minPublicationDate };
	}
	if (minCreationDate != null) {
	    assert.equal(typeof(minCreationDate), 'number', 'Start creation date should be a number');
	    query.creation_date = { $gte: minCreationDate };	
	}
	if (maxExpiryDate != null){
	    assert.equal(typeof(maxExpiryDate), 'number', 'maxExpiry should be a number');
	    query.expiry_date = { $lte: maxExpiryDate };
	}

	const found = await EntrySchema.find(query, null, { sort: { priority: 1, creation_date: -1 }});
	Logger.info(found.length + ' entries found');
	return found;	
    }

    
    
};

module.exports.EntryDAL = new EntryDAL();
