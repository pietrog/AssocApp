const assert = require('assert').strict,
      mongoose = require('mongoose'),
      util = require('util');

const CourseAPI = require('./CourseAPI.js'),
      CourseSchema = require('./CourseSchema'),
      config = require('../../config.js'),
      error_messages = require('./error_messages'),
      Logger = require('../logger').logger;

const EventSchema = require('../events/EventSchema'),
      EventListSchema = require('../events/EventListSchema');

describe('Course Component', function() {
    
    before(() => {
	mongoose.connect(config.testdatabase, { useNewUrlParser: true});
	//mongoose.set('debug', true);
	//Logger.setLevel('silent');
    });

    beforeEach( async () => {
	await CourseSchema.deleteMany();
	await EventSchema.deleteMany({});
	await EventListSchema.deleteMany({});
	
    });

    after(async () => {
	await EventSchema.deleteMany({});
	await EventListSchema.deleteMany({});
    });
    
    describe('CourseAPI', async function() {
	
	it('should add course from 14//2018 14:00 to 17/09/2018 17:30', async () => {
	    //set begin/end dates
	    const begin_date = new Date(2018, 08, 17, 10, 00);
	    const end_date = new Date(2019, 08, 19, 22, 30);

	    //add the event
	    const res = await CourseAPI.createCourse(
		"Initiation combat",
		"Apprentissage du combat pour les débutants",
		begin_date,
		120,
		end_date,
		"* * * * 2,4", //mardi et jeudi
		3
	    );

	    //assertions
	    assert.equal("Initiation combat", res.name);
	    assert.ok(!!res._id);
	});
    
    });
    
})
