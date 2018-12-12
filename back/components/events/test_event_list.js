const assert = require('assert').strict,
      mongoose = require('mongoose'),
      util = require('util');

const EventListAPI = require('./EventListAPI'),
      EventAPI = require('./EventAPI'),
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
	
	it('should create 3 events, monday and wednesday of the week', async () => {
	    //set begin/end dates
	    const first_start_date = new Date(2018, 08, 10, 14, 00); // 10 septembre 2018 14:00
	    const final_date = new Date(2018, 08, 19, 13, 00); // 17 septembre 2018 13:00
	    const frequency = "* * * * 1,3"; // should find 10 septembre 14:00 to 16:00 and 12 septembre 2018 14:00 to 16:00
	    
	    //add the event
	    const res = await EventListAPI.createRecurrentEvent(
		"Cours adulte",
		"Cours adulte",
		"Cours pour les adultes de plus de 20 ans",
		first_start_date.getTime(),
		120,
		frequency,
		final_date.getTime()
	    );

	    //assertions
	    assert.equal(res.listOfEvents.length, 3);

	    //check first event
	    const event_1 = await EventAPI.findEventByID(res.listOfEvents[0]);
	    const begin_date_1 = event_1.begin_date;
	    const end_date_1 = event_1.end_date;

	    const expected_begin_date_1 = new Date(2018, 08, 10, 14, 00);
	    const expected_end_date_1 = new Date(2018, 08, 10, 16, 00);

	    assert.equal(begin_date_1, expected_begin_date_1.getTime());
	    assert.equal(end_date_1, expected_end_date_1.getTime());

	    //check second event
	    const event_2 = await EventAPI.findEventByID(res.listOfEvents[1]);
	    const begin_date_2 = event_2.begin_date;
	    const end_date_2 = event_2.end_date;

	    const expected_begin_date_2 = new Date(2018, 08, 12, 14, 00);
	    const expected_end_date_2 = new Date(2018, 08, 12, 16, 00);
	    
	    assert.equal(begin_date_2, expected_begin_date_2.getTime());
	    assert.equal(end_date_2, expected_end_date_2.getTime());

	    //check third event
	    const event_3 = await EventAPI.findEventByID(res.listOfEvents[2]);
	    const begin_date_3 = event_3.begin_date;
	    const end_date_3 = event_3.end_date;

	    const expected_begin_date_3 = new Date(2018, 08, 17, 14, 00);
	    const expected_end_date_3 = new Date(2018, 08, 17, 16, 00);
	    
	    assert.equal(begin_date_3, expected_begin_date_3.getTime());
	    assert.equal(end_date_3, expected_end_date_3.getTime());
	    
	});

	it('should not create any event', async () => {
	    //set begin/end dates
	    const first_start_date = new Date(2018, 08, 21, 12, 00); // 10 septembre 2018 14:00
	    const final_date = new Date(2018, 08, 26, 24, 00); // 17 septembre 2018 13:00
	    const frequency = "* * * * 4"; // 
	    
	    //add the event
	    const res = await EventListAPI.createRecurrentEvent(
		"Cours adulte",
		"Cours adulte",
		"Cours pour les adultes de plus de 20 ans",
		first_start_date.getTime(),
		60,
		frequency,
		final_date.getTime()
	    );

	    //assertions
	    assert.equal(res, null);
	    
	});
	
	it('should create one event at the beginning', async () => {
	    //set begin/end dates
	    const first_start_date = new Date(2018, 08, 20, 12, 00); // 10 septembre 2018 14:00
	    const final_date = new Date(2018, 08, 26, 24, 00); // 17 septembre 2018 13:00
	    const frequency = "* * * * 4"; // 
	    
	    //add the event
	    const res = await EventListAPI.createRecurrentEvent(
		"Cours adulte",
		"Cours adulte",
		"Cours pour les adultes de plus de 20 ans",
		first_start_date.getTime(),
		60,
		frequency,
		final_date.getTime()
	    );

	    //assertions
	    assert.equal(res.listOfEvents.length, 1);

	    //check first event
	    const event_1 = await EventAPI.findEventByID(res.listOfEvents[0]);
	    const begin_date_1 = event_1.begin_date;
	    const end_date_1 = event_1.end_date;

	    const expected_begin_date_1 = new Date(2018, 08, 20, 12, 00);
	    const expected_end_date_1 = new Date(2018, 08, 20, 13, 00);

	    assert.equal(begin_date_1, expected_begin_date_1.getTime());
	    assert.equal(end_date_1, expected_end_date_1.getTime());

	    
	});

	it('should create one event at the end', async () => {
	    //set begin/end dates
	    const first_start_date = new Date(2018, 08, 21, 12, 00); // 10 septembre 2018 14:00
	    const final_date = new Date(2018, 08, 27, 12, 00); // 17 septembre 2018 13:00
	    const frequency = "* * * * 4"; // 
	    
	    //add the event
	    const res = await EventListAPI.createRecurrentEvent(
		"Cours adulte",
		"Cours adulte",
		"Cours pour les adultes de plus de 20 ans",
		first_start_date.getTime(),
		60,
		frequency,
		final_date.getTime()
	    );

	    //assertions
	    assert.equal(res.listOfEvents.length, 1);

	    //check first event
	    const event_1 = await EventAPI.findEventByID(res.listOfEvents[0]);
	    const begin_date_1 = event_1.begin_date;
	    const end_date_1 = event_1.end_date;

	    const expected_begin_date_1 = new Date(2018, 08, 27, 12, 00);
	    const expected_end_date_1 = new Date(2018, 08, 27, 13, 00);

	    assert.equal(begin_date_1, expected_begin_date_1.getTime());
	    assert.equal(end_date_1, expected_end_date_1.getTime());

	});


    
    });
    
})
