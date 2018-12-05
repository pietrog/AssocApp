const assert = require('assert').strict,
      mongoose = require('mongoose'),
      util = require('util');

const CourseAPI = require('./CourseAPI.js'),
      CourseSchema = require('./CourseSchema'),
      config = require('../../config.js'),
      error_messages = require('./error_messages'),
      Logger = require('../logger').logger,
      UserAPI = require('../users/UserAPI'),
      UserSchema = require('../users/UserSchema');;

const EventSchema = require('../events/EventSchema'),
      EventListSchema = require('../events/EventListSchema');

describe('Course Component', function() {
    
    before(() => {
	mongoose.connect(config.testdatabase, { useNewUrlParser: true});
	Logger.level = 'fatal';
    });

    beforeEach( async () => {
	await CourseSchema.deleteMany();
	await EventSchema.deleteMany({});
	await EventListSchema.deleteMany({});
	await EventListSchema.deleteMany({});
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
	await CourseAPI.addUsersToCourse(cours1._id, user_list1);
	
    });

    after(async () => {
	await CourseSchema.deleteMany();
	await EventSchema.deleteMany({});
	await EventListSchema.deleteMany({});
	await EventListSchema.deleteMany({});
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
		begin_date,
		120,
		end_date,
		"* * * * 2,4", //mardi et jeudi
		3
	    );
	    
	    //assertions
	    assert(res);
	    assert.equal("Initiation combat", res.name);
	    assert.ok(res._id);
	});

	it('should find the course by name', async () => {
	    let cours = await CourseAPI.getCourseByName('Cours1');
	    
	    assert(cours);
	    assert.equal(cours.length, 1);
	    assert.equal(cours[0].description, "Cours1 desc");
		
	});
	
	it('should not add course (same name already exists)', async () => {
	    //set begin/end dates
	    const begin_date = new Date(2018, 08, 17, 10, 00);
	    const end_date = new Date(2019, 10, 19, 22, 30);
	    
	    //add the event
	    const res = await CourseAPI.createCourse(
		"Cours1",
		"Cours1 desc",
		begin_date,
		120,
		end_date,
		"* * * * 2,4",
		3
	    );
	    
	    //assertions
	    assert(!res);
	});


	it('should add 1 user to the course', async () => {

	    //add user to course 1
	    let id_cours1 = await CourseAPI.getCourseByName('Cours1');
	    let yassine_id = await UserAPI.findUsersByCritera('Yassine');

	    await CourseAPI.addUsersToCourse(id_cours1, [yassine_id[0]._id]);

	    let cours1 = await CourseAPI.getCourseByName('Cours1');
	    //console.log(util.inspect(cours1));
	    assert.equal(cours1[0].user_list.length, 3);
	    
	});

	it('should add 7 users to the course', async () => {

	    //add user to course 1
	    let id_cours1 = await CourseAPI.getCourseByName('Cours1');

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

	    await CourseAPI.addUsersToCourse(id_cours1, user_list);
	    
	    let cours1 = await CourseAPI.getCourseByName('Cours1');
	    //Assert we insert 7 users
	    assert.equal(cours1[0].user_list.length, 9);

	    user_list.push(u1._id);
	    user_list.push(u2._id);
	    user_list.sort();

	    assert.equal(user_list.length, cours1[0].user_list.length);
	    //check that users inserted are what we want
	    for(i = 0; i < user_list.length; ++i) {
		assert(user_list[i].equals(cours1[0].user_list[i]));
	    }
	    
	});

	it('should add 5 users to the course(2 duplicates)', async () => {

	    //add user to course 1
	    let id_cours1 = await CourseAPI.getCourseByName('Cours1');

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

	    await CourseAPI.addUsersToCourse(id_cours1, user_list);
	    
	    let cours1 = await CourseAPI.getCourseByName('Cours1');
	    //Assert we insert 5 users
	    assert.equal(cours1[0].user_list.length, 7);

	    let expected_list = [j1._id, j3._id, j4._id, j5._id, j6._id];
	    expected_list.push(u1._id);
	    expected_list.push(u2._id);
	    expected_list.sort();

	    assert.equal(expected_list.length, cours1[0].user_list.length);
	    //check that users inserted are what we want
	    for(i = 0; i < user_list.length; ++i) {
		assert(expected_list[i].equals(cours1[0].user_list[i]));
	    }
	    
	});


	
    });

    
})
