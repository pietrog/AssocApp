const assert = require('assert').strict,
      mongoose = require('mongoose'),
      util = ('util');

const EntryAPI = require('./EntryAPI.js'),
      EntrySchema = require('./EntrySchema'),
      config = require('../../config.js'),
      error_messages = require('./error_messages'),
      Logger = require('../logger').logger;


describe('Blog Component', function() {
    
    before(() => {
	mongoose.connect(config.unittestdatabase, { useNewUrlParser: true});
	//mongoose.set('debug', true);
	Logger.level = 'silent';
    });

    beforeEach( async () => {
	await EntrySchema.deleteMany();
	const start_pub_1 = (new Date(2020, 1, 20)).getTime();
	const start_pub_2 = (new Date(2020, 2, 20)).getTime();
	const start_pub_3 = (new Date(2020, 3, 20)).getTime();

	const start_exp_1 = (new Date(2020, 4, 20)).getTime();
	const start_exp_2 = (new Date(2020, 5, 20)).getTime();
	const start_exp_3 = (new Date(2020, 6, 20)).getTime();
	//insert few events
	//order is on priority and creation date, so it should be: pub3, pub1H, pub1, pub2
	const entry1h = await EntryAPI.createNewEntry("pub1H", start_pub_1, start_exp_1, "desc 1", 1);
	const entry1 = await EntryAPI.createNewEntry("pub1", start_pub_1, start_exp_1, "desc 1", 2);
	const entry2 = await EntryAPI.createNewEntry("pub2", start_pub_2, start_exp_2, "desc 2", 3);
	const entry3 = await EntryAPI.createNewEntry("pub3", start_pub_3, start_exp_3, "desc 3", 1);
    });

    
    describe('EntryAPI', async function() {
	
	it('should add the entry', async () => {
	    const pub_date = Date.now();
	    const expiry_date = pub_date + 10000;	    
	    
	    const new_entry = await EntryAPI.createNewEntry(
		"Stage technique",
		pub_date,
		expiry_date,
		"Un stage vraiment sympa",
		1
	    );

	    const found = await EntryAPI.getOneEntry("Stage technique");

	    //assertions
	    assert.equal(found.message, "Un stage vraiment sympa", "Wrong message inserted");
	    assert(typeof(found._id) === 'object', "id should be generated");
	    assert(found.publication_date === pub_date, "wrong publication date");
	    assert(found.expiry_date === expiry_date, "wrong expiry date");
	});

	it('should add two differents entries', async () => {
	    const pub_date1 = Date.now();
	    const expiry_date1 = pub_date1 + 10000;	    

	    const pub_date2 = Date.now() + 30000;
	    const expiry_date2 = pub_date2 + 70000;	    
	    
	    
	    const entry1 = await EntryAPI.createNewEntry(
		"Stage technique",
		pub_date1,
		expiry_date1,
		"Un stage vraiment sympa",
		2
	    );
	    const entry2 = await EntryAPI.createNewEntry(
		"Stage combat",
		pub_date2,
		expiry_date2,
		"Un stage vraiment sympa",
		3
	    );

	    const found1 = await EntryAPI.getOneEntry("Stage technique");
	    const found2 = await EntryAPI.getOneEntry("Stage combat");

	    //assertions
	    assert.equal(found1.message, "Un stage vraiment sympa", "Wrong message inserted");
	    assert(typeof(found1._id) === 'object', "id should be generated");
	    assert(found1.publication_date === pub_date1, "wrong publication date");
	    assert(found1.expiry_date === expiry_date1, "wrong expiry date");

	    assert.equal(found2.message, "Un stage vraiment sympa", "Wrong message inserted");
	    assert(typeof(found2._id) === 'object', "id should be generated");
	    assert(found2.publication_date === pub_date2, "wrong publication date");
	    assert(found2.expiry_date === expiry_date2, "wrong expiry date");

	});

	it('should not insert this publication because of the title already existing', async () => {
	    const publication = new Date(2021, 1, 20);
	    const expiry = new Date(2021, 2, 20);

	    const entry1 = await EntryAPI.createNewEntry(
		"pub1",
		publication,
		expiry,
		"Un stage vraiment sympa",
		1
	    );
	    assert(entry1 === null, "expects entry not to be created");
	});

	it('should return the 3 events inserted in database', async () => {
	    const entries = await EntryAPI.getEntries();

	    assert.equal(entries.length, 4, "expects 3 entries to be returned");
	    assert.equal(entries[0].title, "pub3", "expects first entry to be pub1");
	    assert.equal(entries[1].title, "pub1H", "expects second entry to be pub2");
	    assert.equal(entries[2].title, "pub1", "expects third entry to be pub3");
	    assert.equal(entries[3].title, "pub2", "expects third entry to be pub3");
	});
	
    });
    
})
