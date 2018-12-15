const assert = require('assert').strict,
      mongoose = require('mongoose'),
      util = ('util');

const EventAPI = require('./EventAPI.js'),
      EventSchema = require('./EventSchema'),
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
	await EventSchema.deleteMany();
	//insert few events
	await EventAPI.addEvent("Event1", "Event1 Brief", "Event1 Description",
				Date.parse('01 Sept 2018 08:00 GMT'), Date.parse('01 Sept 2018 09:00 GMT'));
	await EventAPI.addEvent("Event2", "Event2 Brief", "Event2 Description",
				Date.parse('15 Sept 2018 12:00 GMT'), Date.parse('15 Sept 2018 14:00 GMT'));

	//5 events on 25 sept 2018
	await EventAPI.addEvent("Event3", "Event3 Brief", "Event3 Description",
				Date.parse('25 Sept 2018 18:45 GMT'), Date.parse('27 Sept 2018 19:00 GMT'));
	await EventAPI.addEvent("Event4", "Event4 Brief", "Event4 Description",
				Date.parse('25 Sept 2018 16:00 GMT'), Date.parse('25 Sept 2018 18:00 GMT'));
	await EventAPI.addEvent("Event5", "Event5 Brief", "Event5 Description",
				Date.parse('25 Sept 2018 09:00 GMT'), Date.parse('25 Sept 2018 11:00 GMT'));
	await EventAPI.addEvent("Event6", "Event6 Brief", "Event6 Description",
				Date.parse('25 Sept 2018 04:00 GMT'), Date.parse('25 Sept 2018 19:00 GMT'));
	await EventAPI.addEvent("Event7", "Event7 Brief", "Event7 Description",
				Date.parse('25 Sept 2018 08:54 GMT'), Date.parse('25 Sept 2018 13:52 GMT'));	
    });

    after(async () => {
	await EventSchema.deleteMany({});
    });
    
    describe('EventAPI', async function() {
	
	it('should add the event from 13/09/2018 14:00 to 13/09/2018 17:30', async () => {
	    //set begin/end dates
	    const begin_date = new Date(2018, 09, 13, 14, 00);
	    const end_date = new Date(2018, 09, 13, 17, 30);

	    //add the event
	    const res = await EventAPI.addEvent(
		"EventTest",
		"Un évènement à ne point louper",
		"suite du buffet de la Saint Jean !",
		begin_date.getTime(),
		end_date.getTime()
	    );

	    //assertions
	    const inserted_begin = new Date(res.begin_date);
	    const inserted_end = new Date(res.end_date);
	    
	    assert.deepEqual(res.name, "EventTest");
	    assert.ok(typeof(res._id) === 'object', "Expects an id !");
	    assert.equal(inserted_begin.getMonth(), 9);
	    assert.equal(inserted_end.getMonth(), 9);
	    assert.equal(inserted_begin.getFullYear(), 2018);
	    assert.equal(inserted_end.getFullYear(), 2018);
	    assert.equal(inserted_begin.getDate(), 13);
	    assert.equal(inserted_end.getDate(), 13);

	    assert.equal(inserted_begin.getHours(), 14);
	    assert.equal(inserted_end.getHours(), 17);
	    assert.equal(inserted_begin.getMinutes(), 00);
	    assert.equal(inserted_end.getMinutes(), 30);
	});

	it('should add the event from 15/09/2018 12:00 to 15/09/2018 14:30', async () => {
	    const event_to_add = {
		name: "EventTest",
		brief: "Un évènement à ne point louper",
		description: "suite du buffet de la Saint Jean !",
		
	    };
	    
	    const begin_date = new Date(2018, 09, 15, 11, 00);
	    const end_date = new Date(2018, 09, 15, 13, 29);
	    
	    const res = await EventAPI.addEvent(
		"EventTest",
		"Un évènement à ne point louper",
		"suite du buffet de la Saint Jean !",
		begin_date.getTime(),
		end_date.getTime()
	    );

	    const inserted_begin = new Date(res.begin_date);
	    const inserted_end = new Date(res.end_date);
	    
	    assert.deepEqual(res.name, "EventTest");
	    assert.ok(typeof(res._id) === 'object', "Expects an id !");
	    assert.equal(inserted_begin.getMonth(), 9);
	    assert.equal(inserted_end.getMonth(), 9);
	    assert.equal(inserted_begin.getFullYear(), 2018);
	    assert.equal(inserted_end.getFullYear(), 2018);
	    assert.equal(inserted_begin.getDate(), 15);
	    assert.equal(inserted_end.getDate(), 15);

	    assert.equal(inserted_begin.getHours(), 11);
	    assert.equal(inserted_end.getHours(), 13);
	    assert.equal(inserted_begin.getMinutes(), 00);
	    assert.equal(inserted_end.getMinutes(), 29);
	});

	it('should not add the event (begin before the end of an event with the same name)', async () => {
	    const begin_date = Date.parse('01 Sept 2018 08:59 GMT');
	    const end_date = Date.parse('01 Sept 2018 10:00 GMT');

	    try {
		const res = await EventAPI.addEvent("Event1", "Un évènement", "Desc", begin_date, end_date);
		assert.equal(1, 10);
	    }
	    catch(err) {
		assert.ok(err.message.includes(error_messages.error_event_already_exists));
	    }	    	    
	});

	it('should not add the event (end after the begining of an event with the same name)', async () => {
	    const begin_date = Date.parse('01 Sept 2018 07:00 GMT');
	    const end_date = Date.parse('01 Sept 2018 08:39 GMT');

	    try {
		const res = await EventAPI.addEvent("Event1", "Un évènement", "Desc", begin_date, end_date);
		assert.equal(1, 10);
	    }
	    catch(err) {
		assert.ok(err.message.includes(error_messages.error_event_already_exists));
	    }	    	    
	});

	it('should add the event (same name, same day but not overlaping)', async () => {
	    const begin_date = Date.parse('01 Sept 2018 09:00 GMT');
	    const end_date = Date.parse('01 Sept 2018 10:00 GMT');
	    const res = await EventAPI.addEvent("Event1", "Un évènement", "Desc", begin_date, end_date);
	    assert.equal(typeof(res), 'object');
	    assert.ok(typeof(res._id) === 'object', "Expects an id !");	    
	});

	it('should add the event (different name,  overlaping with other event)', async () => {
	    const begin_date = Date.parse('01 Sept 2018 08:00 GMT');
	    const end_date = Date.parse('01 Sept 2018 10:00 GMT');
	    const res = await EventAPI.addEvent("Event0", "Un évènement", "Desc", begin_date, end_date);
	    assert.equal(typeof(res), 'object');
	    assert.ok(typeof(res._id) === 'object', "Expects an id !");
	});	

	it('should remove event just previously inserted', async () => {
	    const begin_date = Date.parse('01 Sept 2022 09:00 GMT');
	    const end_date = Date.parse('01 Sept 2022 11:00 GMT');
	    const inserted = await EventAPI.addEvent("ToDeleteEvent", "Un évènement", "Desc", begin_date, end_date);

	    await EventAPI.deleteEvent(inserted._id);
	    let found = await EventAPI.findEventByCritera({ name: 'ToDeleteEvent'});
	    assert.equal(found.length, 0);
	    
	});
	
    });
    
})
