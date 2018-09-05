const assert = require('assert').strict,
      mongoose = require('mongoose'),
      util = ('util');

const EventListAPI = require('./EventListAPI.js'),
      EventListSchema = require('./EventListSchema'),
      config = require('../../config.js'),
      error_messages = require('./error_messages'),
      Logger = require('../logger').logger;


describe('Event Component', function() {
    
    before(() => {
	mongoose.connect(config.testdatabase, { useNewUrlParser: true});
	//mongoose.set('debug', true);
	//Logger.setLevel('silent');
    });

    beforeEach( async () => {
	await EventListSchema.deleteMany();
	//insert few events
    });

    after(async () => {
	await EventListSchema.deleteMany({});
    });
    
    describe('EventListAPI', async function() {
	
	it('should create 2 events, monday and wednesday of the week', async () => {
	    //set begin/end dates
	    const first_start_date = new Date(2018, 09, 10, 14, 00);
	    const final_date = new Date(2018, 09, 17, 16, 00);
	    const frequency = "* * * * 1,3";
	    
	    //add the event
	    const res = await EventListAPI.createRecurrentEvent(
		"Cours adulte",
		"Cours adulte",
		"Cours pour les adultes de plus de 20 ans",
		first_start_date,
		1000 * 120,
		frequency,
		final_date
	    );

	    //assertions
	    console.log("AZHAHAHHAH : " + util.inspect(res));
	    assert.equal(res.listOfEvents.length, 2);
	});

    
    });
    
})
