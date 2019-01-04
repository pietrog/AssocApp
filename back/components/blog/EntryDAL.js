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
     * @param {Object} [startPubDate] Get all entries having a publication date greater of equal to this date
     * @param {Object} [startCreationDate] Get all entries having a creation date greater of equal to this date
     */
    async getAllEntry(startPubDate, startCreationDate) {

	const date_selector = null;
	if (startPubDate != null && startCreationDate != null) {
	    assert.equal(typeof(startPubDate), 'number', 'Start pub date should be a number');
	    assert.equal(typeof(startCreationDate), 'number', 'Start creation date should be a number');
	    
	    date_selector = {
		"$and": [
		    {
			"publication_date": { "gt": startPubDate },
			"creation_date": { "gt": startCreationDate },
		    }
		]
	    };
	}
	else if (startPubDate != null) {
	    date_selector = {
		"publication_date": { "gt": startPubDate }
	    };
	}
	else if (startCreationDate != null) {
	    date_selector = {
		"creation_date": { "gt": startCreationDate }
	    };
	}
	
	const found = await EntrySchema.find(date_selector, null, { sort: { priority: 1, creation_date: -1 }});
	Logger.info(found.length + ' entries found');
	return found;	
    }

    
    
};

module.exports.EntryDAL = new EntryDAL();
