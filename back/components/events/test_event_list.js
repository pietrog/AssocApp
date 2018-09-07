const assert = require('assert').strict,
      mongoose = require('mongoose'),
      util = ('util');

const EventListAPI = require('./EventListAPI'),
      EventListSchema = require('./EventListSchema'),
      EventSchema = require('./EventSchema'),
      config = require('../../config.js'),
      error_messages = require('./error_messages'),
      Logger = require('../logger').logger;


describe('Event List Component', function() {
    
    before(() => {
	mongoose.connect(config.testdatabase, { useNewUrlParser: true});
	//mongoose.set('debug', true);
	//Logger.setLevel('silent');
    });

    beforeEach( async () => {
	await EventListSchema.deleteMany();
	await EventSchema.deleteMany();
	//insert few events
    });

    after(async () => {
	await EventListSchema.deleteMany({});
	await EventSchema.deleteMany();
    });
    
    describe('EventListAPI', async function() {
	
	it('should create 2 events, monday and wednesday of the week', async () => {
	    //set begin/end dates
	    const first_start_date = new Date(2018, 08, 10, 14, 00);
	    const final_date = new Date(2018, 08, 17, 13, 00);
	    const frequency = "* * * * 1,3";
	    
	    //add the event
	    const res = await EventListAPI.createRecurrentEvent(
		"Cours adulte",
		"Cours adulte",
		"Cours pour les adultes de plus de 20 ans",
		first_start_date,
		120,
		frequency,
		final_date
	    );

	    //assertions
	    assert.equal(res.listOfEvents.length, 2);
	});

    
    });
    
})
