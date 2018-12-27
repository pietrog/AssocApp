const assert = require('assert').strict,
      mongoose = require('mongoose'),
      util = require('util');

const CourseAPI = require('./CourseAPI.js'),
      config = require('../../config.js'),
      error_messages = require('./error_messages'),
      Logger = require('../logger').logger,
      UserAPI = require('../users/UserAPI'),
      UserSchema = require('../users/UserSchema');

const EventSchema = require('../events/EventSchema');

describe('Course Component', function() {
    
    before(() => {
	mongoose.connect(config.unittestdatabase, { useNewUrlParser: true});
	Logger.level = 'fatal';
    });

    beforeEach( async () => {
	await EventSchema.deleteMany({});
	await UserSchema.deleteMany({});

	let user1 = await UserAPI.addStudent({firstname: "Jean", lastname: "Valjean", birthdate: new Date(2000, 8, 1)});
	let user2 = await UserAPI.addStudent({firstname: "Collette", lastname: "Simone", birthdate: new Date(2002, 8, 2)});
	await UserAPI.addStudent({firstname: "Yassine", lastname: "Berbouk", birthdate: new Date(2004, 8, 17)});
	await UserAPI.addStudent({firstname: "Manu", lastname: "Macron", birthdate: new Date(2006, 8, 17)});
	await UserAPI.addStudent({firstname: "Reine", lastname: "dAngleterre", birthdate: new Date(2005, 8, 17)});

	let cours1 = await CourseAPI.createCourse("Cours1", "Cours1 desc",
						  new Date(2018, 8, 17, 10, 0), 120,
						  new Date(2019, 10, 19, 22, 30),
						  "* * * * 2,4",
						  3); // every tuesday and thursday, 2 hours, 10am to 12am
	//2 users in this course
	let user_list1 = [user1._id, user2._id];
	await CourseAPI.addUsersToCourse("Cours1", user_list1);
	
    });

    after(async () => {
	await EventSchema.deleteMany({});
	await UserSchema.deleteMany({});
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
		begin_date.getTime(),
		120,
		end_date.getTime(),
		"* * * * 2,4", //mardi et jeudi
		3
	    );
	    
	    //assertions
	    assert.equal(res.length, 106);
	});

	it('should find 10 events named Cours1', async () => {
	    let nbEvents = await CourseAPI.countEvents('Cours1');	    
	    assert.equal(nbEvents, 123);
	});
	
	it('should not add course (same name already exists)', async () => {
	    //set begin/end dates
	    const begin_date = new Date(2018, 08, 17, 10, 00);
	    const end_date = new Date(2019, 10, 19, 22, 30);

	    try {
		//add the event
		const res = await CourseAPI.createCourse(
		    "Cours1",
		    "Cours1 desc",
		    begin_date.getTime(),
		    120,
		    end_date.getTime(),
		    "* * * * 2,4",
		    3
		);
		assert.equal(1,2);
	    }
	    catch (err) {
		assert.equal(typeof(err), 'object');
	    }
	    
	});
	

	it('should add 1 user to the course', async () => {
	    
	    //add user to course 1
	    let yassine_id = await UserAPI.findUsersByCritera('Yassine');

	    await CourseAPI.addUsersToCourse('Cours1', [yassine_id[0]._id]);

	    let cours1 = await CourseAPI.getEventsByName('Cours1');
	    //console.log(util.inspect(cours1));
	    assert.equal(cours1[0].user_list.length, 3);
	    
	});

	it('should add 7 users to the course', async () => {

	    //add user to course 1
	    let u1 = (await UserAPI.findUsersByCritera('Jean'))[0];
	    let u2 = (await UserAPI.findUsersByCritera('Collette'))[0];
	    let j1 = await UserAPI.addStudent({firstname: "Jean1", lastname: "Valjean", birthdate: new Date(2006, 8, 17)});
	    let j2 = await UserAPI.addStudent({firstname: "Jean2", lastname: "Valjean", birthdate: new Date(2006, 8, 17)});
	    let j3 = await UserAPI.addStudent({firstname: "Jean3", lastname: "Valjean", birthdate: new Date(2006, 8, 17)});
	    let j4 = await UserAPI.addStudent({firstname: "Jean4", lastname: "Valjean", birthdate: new Date(2006, 8, 17)});
	    let j5 = await UserAPI.addStudent({firstname: "Jean5", lastname: "Valjean", birthdate: new Date(2006, 8, 17)});
	    let j6 = await UserAPI.addStudent({firstname: "Jean6", lastname: "Valjean", birthdate: new Date(2006, 8, 17)});
	    let j7 = await UserAPI.addStudent({firstname: "Jean7", lastname: "Valjean", birthdate: new Date(2006, 8, 17)});
	    let user_list = [j1._id, j2._id, j3._id, j4._id, j5._id, j6._id, j7._id];

	    await CourseAPI.addUsersToCourse('Cours1', user_list);
	    
	    let events = await CourseAPI.getEventsByName('Cours1');
	    //Assert we insert 7 users
	    assert.equal(events[0].user_list.length, 9);

	    user_list.push(u1._id);
	    user_list.push(u2._id);
	    user_list.sort();

	    assert.equal(user_list.length, events[0].user_list.length);
	    //check that users inserted are what we want
	    for(i = 0; i < user_list.length; ++i) {
		assert(user_list[i].equals(events[0].user_list[i]));
	    }
	    
	});

	it('should add 5 users to the course(2 duplicates)', async () => {

	    //add user to course 1
	    let u1 = (await UserAPI.findUsersByCritera('Jean'))[0];
	    let u2 = (await UserAPI.findUsersByCritera('Collette'))[0];
	    let j1 = await UserAPI.addStudent({firstname: "Jean1", lastname: "Valjean", birthdate: new Date(2006, 8, 17)});
	    let j2 = await UserAPI.addStudent({firstname: "Jean2", lastname: "Valjean", birthdate: new Date(2006, 8, 17)});
	    let j3 = await UserAPI.addStudent({firstname: "Jean3", lastname: "Valjean", birthdate: new Date(2006, 8, 17)});
	    let j4 = await UserAPI.addStudent({firstname: "Jean4", lastname: "Valjean", birthdate: new Date(2006, 8, 17)});
	    let j5 = await UserAPI.addStudent({firstname: "Jean5", lastname: "Valjean", birthdate: new Date(2006, 8, 17)});
	    let j6 = await UserAPI.addStudent({firstname: "Jean6", lastname: "Valjean", birthdate: new Date(2006, 8, 17)});
	    let j7 = await UserAPI.addStudent({firstname: "Jean7", lastname: "Valjean", birthdate: new Date(2006, 8, 17)});
	    let user_list = [j1._id, j4._id, j3._id, j4._id, j5._id, j6._id, j4._id];

	    await CourseAPI.addUsersToCourse('Cours1', user_list);
	    
	    let events = await CourseAPI.getEventsByName('Cours1');
	    //Assert we insert 5 users
	    assert.equal(events[0].user_list.length, 7);

	    let expected_list = [j1._id, j3._id, j4._id, j5._id, j6._id];
	    expected_list.push(u1._id);
	    expected_list.push(u2._id);
	    expected_list.sort();

	    assert.equal(expected_list.length, events[0].user_list.length);
	    //check that users inserted are what we want
	    for(i = 0; i < user_list.length; ++i) {
		assert(expected_list[i].equals(events[0].user_list[i]));
	    }
	    
	});

	it('should create 3 events, monday and wednesday of the week', async () => {
	    //set begin/end dates
	    const first_start_date = new Date(2018, 08, 10, 14, 00); // 10 septembre 2018 14:00
	    const final_date = new Date(2018, 08, 19, 13, 00); // 17 septembre 2018 13:00
	    const frequency = "* * * * 1,3"; // should find 10 septembre 14:00 to 16:00 and 12 septembre 2018 14:00 to 16:00
	    
	    //add the event
	    const res = await CourseAPI.createRecurrentEvent(
		"Cours adulte",
		"Cours pour les adultes de plus de 20 ans",
		first_start_date.getTime(),
		120,
		final_date.getTime(),
		frequency,
		0,
		''
	    );

	    //assertions
	    assert.equal(res.length, 3, "Expects 3 events created");
	    const inserted = await CourseAPI.getEventsByName('Cours adulte');
	    assert.equal(inserted.length, 3, "Expects 3 events inserted");
	    
	    //check first event
	    const event_1 = inserted[0];
	    const begin_date_1 = event_1.begin_date;
	    const end_date_1 = event_1.end_date;

	    const expected_begin_date_1 = new Date(2018, 08, 10, 14, 00);
	    const expected_end_date_1 = new Date(2018, 08, 10, 16, 00);

	    assert.equal(begin_date_1, expected_begin_date_1.getTime());
	    assert.equal(end_date_1, expected_end_date_1.getTime());

	    //check second event
	    const event_2 = inserted[1];
	    const begin_date_2 = event_2.begin_date;
	    const end_date_2 = event_2.end_date;

	    const expected_begin_date_2 = new Date(2018, 08, 12, 14, 00);
	    const expected_end_date_2 = new Date(2018, 08, 12, 16, 00);
	    
	    assert.equal(begin_date_2, expected_begin_date_2.getTime());
	    assert.equal(end_date_2, expected_end_date_2.getTime());

	    //check third event
	    const event_3 = inserted[2];
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
	    const res = await CourseAPI.createRecurrentEvent(
		"Cours adulte",
		"Cours pour les adultes de plus de 20 ans",
		first_start_date.getTime(),
		60,
		final_date.getTime(),
		frequency
	    );
	    assert.equal(res.length, 0); //should not pass this test, should throw before

	    
	});
	
	it('should create one event at the beginning', async () => {
	    //set begin/end dates
	    const first_start_date = new Date(2018, 08, 20, 12, 00); // 10 septembre 2018 14:00
	    const final_date = new Date(2018, 08, 26, 24, 00); // 17 septembre 2018 13:00
	    const frequency = "* * * * 4"; // 
	    
	    //add the event
	    const res = await CourseAPI.createRecurrentEvent(
		"Cours adulte",
		"Cours pour les adultes de plus de 20 ans",
		first_start_date.getTime(),
		60,		
		final_date.getTime(),
		frequency
	    );

	    //assertions
	    assert.equal(res.length, 1);

	    //take back the event
	    const inserted = await CourseAPI.getEventsByName('Cours adulte');
	    assert.equal(inserted.length, 1);
	    
	    //check first event
	    const event_1 = inserted[0];
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
	    const res = await CourseAPI.createRecurrentEvent(
		"Cours adulte",
		"Cours pour les adultes de plus de 20 ans",
		first_start_date.getTime(),
		60,
		final_date.getTime(),
		frequency
	    );

	    //assertions
	    assert.equal(res.length, 1);

	    //take back the event
	    const inserted = await CourseAPI.getEventsByName('Cours adulte');
	    assert.equal(inserted.length, 1);

	    
	    //check first event
	    const event_1 = inserted[0];
	    const begin_date_1 = event_1.begin_date;
	    const end_date_1 = event_1.end_date;

	    const expected_begin_date_1 = new Date(2018, 08, 27, 12, 00);
	    const expected_end_date_1 = new Date(2018, 08, 27, 13, 00);

	    assert.equal(begin_date_1, expected_begin_date_1.getTime());
	    assert.equal(end_date_1, expected_end_date_1.getTime());

	});

    });

    
})
