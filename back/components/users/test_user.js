const assert = require('assert').strict,
      mongoose = require('mongoose'),
      util = ('util');

const UserAPI = require('./UserAPI.js'),
      UserSchema = require('./UserSchema'),
      config = require('../../config.js'),
      error_messages = require('./error_messages'),
      Logger = require('../logger').logger;


describe('User Component', function() {
    before(() => {
	mongoose.connect(config.testdatabase, { useNewUrlParser: true});
	//Logger.setLevel('silent');
    });

    beforeEach( async () => {
	await UserSchema.deleteMany({});
	//add 5 students
	await UserAPI.addStudent({firstname: "Jean", lastname: "Valjean"});
	await UserAPI.addStudent({firstname: "Collette", lastname: "Simone"});
	await UserAPI.addStudent({firstname: "Yassine", lastname: "Berbouk"});
	await UserAPI.addStudent({firstname: "Manu", lastname: "Macron"});
	await UserAPI.addStudent({firstname: "Reine", lastname: "dAngleterre"});
	//add 2 teachers
	await UserAPI.addTeacher({firstname: "Monsieur", lastname: "Vissio"});
	await UserAPI.addTeacher({firstname: "Antoine", lastname: "Conze"});
	//add 3 staff members
	await UserAPI.addStaff({firstname: "Ilias", lastname: "Dos santos"});
	await UserAPI.addStaff({firstname: "Monique", lastname: "Renou"});
	await UserAPI.addStaff({firstname: "Bernardo", lastname: "Henrique"});
	//add 1 manager
	await UserAPI.addManager({firstname: "Dark", lastname: "Vador"});
    });

    after(async () => {
	await UserSchema.deleteMany({});
    });
    
    describe('UserAPI', function() {
	it('should add the student', async () => {
	    const user_to_add = {
		firstname: "Vlad",
		lastname: "Poutine"
	    };
	    const res = await UserAPI.addStudent(user_to_add);
	    assert.deepEqual(res.firstname, user_to_add.firstname);
	});

	it('should add the staff member', async () => {
	    const user_to_add = {
		firstname: "Henry",
		lastname: "Lesquin"
	    };
	    const res = await UserAPI.addStaff(user_to_add);
	    assert.deepEqual(res.firstname, user_to_add.firstname);
	});

	it('should add the teacher', async () => {
	    const user_to_add = {
		firstname: "Guillermo",
		lastname: "Deltorro"
	    };
	    const res = await UserAPI.addTeacher(user_to_add);
	    assert.deepEqual(res.firstname, user_to_add.firstname);
	});
	
	it('should add the manager', async () => {
	    const user_to_add = {
		firstname: "Pierre",
		lastname: "Gaulard"
	    };
	    const res = await UserAPI.addManager(user_to_add);
	    assert.deepEqual(res.firstname, user_to_add.firstname);
	});
	

	it('should throws an exception because firstname not given', async() => {
	    const user_to_add = {
		lastname: "Poutine",
	    };
	    try{
		await UserAPI.addStudent(user_to_add);
		assert.equal(1,2);
	    }
	    catch (err) {
		assert.equal(err.message, error_messages.error_no_firstname_given);
	    }
	
	});

	it('should throws an exception because of the bad user input', async() => {
	    try{
		await UserAPI.addStudent("Vladimir");
		assert.equal(1,2);
	    }
	    catch (err) {
		assert.equal(err.message, error_messages.error_bad_user_data);
	    }
	
	});

	
	it('should throws an exception because lastname not given', async() => {
	    const user_to_add = {
		firstname: "Vlad"
	    };

	    try {
		await UserAPI.addStudent(user_to_add);
		assert.equal(1,2);
	    }
	    catch(err) {
		assert.equal(err.message, error_messages.error_no_lastname_given);
	    }
	});

	it('should not add the user again', async () => {
	    const user_to_add = {firstname: "Jean", lastname: "Valjean"}

	    try {
		await UserAPI.addStudent(user_to_add);
		assert.equal(1,2);
	    }
	    catch (err) {
		assert.equal(err.message, error_messages.error_user_already_exists + "(" + user_to_add.firstname + ")");
	    }
	});

	it('should count 5 students, 3 staff members, 2 teachers and 1 manager ', async () => {
	    assert.equal(await UserAPI.countStudents(), 5);
	    assert.equal(await UserAPI.countStaffs(), 3);
	    assert.equal(await UserAPI.countTeachers(), 2);
	    assert.equal(await UserAPI.countManagers(), 1);
	});

	it('should return 5 students', async() => {
	    const list_of_students = await UserAPI.findUsersByCritera(null, null, 'student', null, null);
	    assert.equal(list_of_students.length, 5);
	});

	it('should modify the firstname of the user', async () => {
	    const initial_user = await UserAPI.findUsersByCritera("Jean");
	    assert.equal(initial_user[0].firstname, "Jean");
	    assert.equal(initial_user[0].lastname, "Valjean");
	    const modified_user = await UserAPI.updateUserByID(initial_user[0]._id, {firstname: "Patrick"});
	    assert.equal(modified_user.firstname, "Patrick");
	    assert.equal(modified_user.lastname, "Valjean");
	    const found_user = await UserAPI.findUsersByCritera(null, "Valjean");
	    assert.equal(found_user[0].firstname, "Patrick");    
	});

	it('should modify the lastname of the user', async () => {
	    const initial_user = await UserAPI.findUsersByCritera("Jean");
	    assert.equal(initial_user[0].firstname, "Jean");
	    assert.equal(initial_user[0].lastname, "Valjean");
	    const modified_user = await UserAPI.updateUserByID(initial_user[0]._id, {lastname: "Segafredo"});
	    assert.equal(modified_user.firstname, "Jean");
	    assert.equal(modified_user.lastname, "Segafredo");
	    const found_user = await UserAPI.findUsersByCritera("Jean");
	    assert.equal(found_user[0].lastname, "Segafredo");    
	});

	it('should return 11 users', async () => {
	    const users = await UserAPI.getAllUsers();
	    assert.equal(users.length, 11);
	});

	it('should return 5 students', async () => {
	    const users = await UserAPI.getAllStudents();
	    assert.equal(users.length, 5);
	});
	
	it('should return 2 teachers', async () => {
	    const users = await UserAPI.getAllTeachers();
	    assert.equal(users.length, 2);
	});

	it('should return 3 staffs', async () => {
	    const users = await UserAPI.getAllStaffs();
	    assert.equal(users.length, 3);
	});

	it('should return 1 manager', async () => {
	    const users = await UserAPI.getAllManagers();
	    assert.equal(users.length, 1);
	});

	
    });
    
});
