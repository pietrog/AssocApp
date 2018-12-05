'use strict';

const UserSchema = require('./UserSchema'),
      assert = require('assert').strict,
      error_messages = require('./error_messages'),
      GenTools = require('../tools'),
      Logger = require('../logger').logger;

const util = require('util');

class UserDAL {

    constructor() {}    
    
    /*
     * Find corresponding users depending on userType and criterias
     * 
     * @param {String} userID User id
     * 
     * @returns {Object} Json object representing the user
     * @throws {AssertError} Will throw an exception if userId is not a string
     */
    findUserById(userID) {
	assert.equal( typeof(userID), 'string', error_messages.error_string_expected);
	
	return UserSchema.findById(userID);
    }

    /*
     * Find a user with given criteras
     * 
     * @param {Object} userDef Json object partially describing an user
     * 
     * @returns {Object} Json object representing the user if found, null otherwise
     */
    findUsersByCritera(firstname, lastname, role, mail, phone) {
	//build the criteras

	const user_crit = {};
	if (typeof(firstname) === 'string') {
	    user_crit.firstname = firstname;
	}
	if (typeof(lastname) === 'string') {
	    user_crit.lastname = lastname;
	}
	if (typeof(role) === 'string') {
	    user_crit.role = role;
	}
	
	return UserSchema.find(user_crit);
    }

    /*
     * Remove the user from the database if exists
     *
     * @param {String} userID User ID
     *
     * @returns
     */
    async removeUser(userID) {
	assert.equal( typeof(userID), 'string', error_messages.error_string_expected);
	
	const user = await this.findUserById(userID);
	Logger.trace('User ' + user.firstname + ' removed');
	return user.remove();
    }
    
    /*
     * Add new student in the database
     *
     * @param {Object} user  Json object, should contain firstname and lastname
     *
     * @returns {Object} Json Object, inserted user (with _id)
     * @throws {TypeError} Will throw an error if user object is not valid
     */
    async addStudent(user) {
	return this.addUser(user, 'student');
    }

    /*
     * Add new teacher in the database
     *
     * @param {Object} user  Json object, should contain firstname and lastname
     *
     * @returns {Object} Json Object, inserted user (with _id)
     * @throws {TypeError} Will throw an error if user object is not valid
     */
    async addTeacher(user) {
	return this.addUser(user, 'teacher');
    }

    /*
     * Add new staff member in the database
     *
     * @param {Object} user  Json object, should contain firstname and lastname
     *
     * @returns {Object} Json Object, inserted user (with _id)
     * @throws {TypeError} Will throw an error if user object is not valid
     */
    async addStaff(user) {
	return this.addUser(user, 'staff');
    }
    
    /*
     * Add new manager in the database
     *
     * @param {Object} user  Json object, should contain firstname and lastname
     *
     * @returns {Object} Json Object, inserted user (with _id)
     * @throws {TypeError} Will throw an error if user object is not valid
     */
    async addManager(user) {
	return this.addUser(user, 'manager');
    }
    
    /*
     * Add new user in the database
     *
     * @param {Object} user  Json object, should contain firstname and lastname
     * @param {string} role The user status: student, staff, teacher or manager
     *
     * @returns {Object} Json Object, inserted user (with _id)
     * @throws {TypeError} Will throw an error if user object is not valid
     */
    async addUser(user, _role) {

	assert.equal( typeof(user), 'object', error_messages.error_bad_user_data);
	assert.equal( typeof(user.firstname), 'string', error_messages.error_no_firstname_given);
	assert.equal( typeof(user.lastname), 'string', error_messages.error_no_lastname_given);
	assert.equal( typeof(user.birthdate), 'object', error_messages.error_birthdate_validity);
	assert.equal( typeof(_role), 'string', error_messages.error_no_role);
	assert.ok(user.firstname.length > 1, error_messages.error_firstname_validity);
	assert.ok(user.lastname.length > 1, error_messages.error_lastname_validity);
	
	//init user to insert
	const _user = {
	    firstname: user.firstname,
	    lastname: user.lastname,
	    inscription_date: Date.now(),
	    role: _role,
	    birthdate: user.birthdate
	};

	//check if an user with same firstname/lastname already exists
	const user_exists = await this.findUsersByCritera(_user.firstname, _user.lastname);
	assert.equal(user_exists.length, 0, error_messages.error_user_already_exists + "(" +user.firstname + ")");
	
	//insert user
	const user_db = new UserSchema(_user);

	try {
	    const user_inserted = await user_db.save();
	    Logger.info('User ' + user_inserted.firstname + ' inserted');
	    return user_inserted;
	}
	catch (err){
	    Logger.error('User ' + _user.firstname + ' insertion failed');
	    return Promise.reject(new TypeError(error_messages.error_user_insertion + "(" + err + ")"));
	}
    }

    /*
     * Count the number of students in the database
     */
    async countStudents() {
	return this.countUsers('student');
    }
    async countStaffs() {
	return this.countUsers('staff');
    }
    async countTeachers() {
	return this.countUsers('teacher');
    }
    async countManagers() {
	return this.countUsers('manager');
    }


    /*
     * Count the number of users in the database
     */
    async countUsers(role) {
	assert.equal( typeof(role), 'string', error_messages.error_no_role);

	const users = await this.findUsersByCritera(null, null, role);

	return users.length;
    }

    /*
     * Modify an existing user
     *
     * @param {string} userID User id
     * @param {object} userDef New user definition, containing fields we want to update
     *
     * @returns {object} Returns modified user
     */
    async modifyUser(userID, userDef) {
	//assert.equal( typeof(userID), 'object', error_messages.error_bad_user_data + "(user id)" + userID);
	
	let user_update = {};
	
	if (typeof(userDef.firstname) === 'string') {
	    user_update.firstname = userDef.firstname;
	}
	if (typeof(userDef.lastname) === 'string') {
	    user_update.lastname = userDef.lastname;
	}
	if (typeof(userDef.inscription_date) === 'object') {
	    user_update.inscription_date = userDef.inscription_date;
	}
	if (typeof(userDef.role) === 'string') {
	    user_update.role = userDef.role;
	}
	if (typeof(userDef.birthday) === 'object') {
	    user_update.birthday = userDef.birthday;
	}
	if (typeof(userDef.emails) === 'object') {
	    user_update.emails = userDef.emails;
	}
	if (typeof(userDef.phone_number) === 'object') {
	    user_update.phone_number = userDef.phone_number;
	}

	return UserSchema.findOneAndUpdate({_id: userID}, user_update, {new: true});
    }
    
};

module.exports = {
    UserDAL: new UserDAL()
}
