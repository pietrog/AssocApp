'use strict';

const Schema = require('./AuthenticatedUserSchema'),
      Logger = require('../logger').logger;

const assert = require('assert').strict;
const util = require('util');


class AuthenticatedUserDAL {

    /**
     * Returns corresponding AuthenticatedUser by name if found, null otherwise
     * @param {String} name User name
     * @returns {Object} Document if found, null otherwise
     */
    async findAuthenticatedUserByName(name) {
	try {
	    const res = await Schema.findOne({ login: name});
	    if (res === null) {
		Logger.info('No AuthenticatedUser found with this name: ' + name);
		return null;
	    }
	    else {
		Logger.info('AuthenticatedUser found with this name: ' + name);
		return res;
	    }
	}
	catch (err) {
	    Logger.error('Error occured while looking for auth user: ' + err);
	    return null;
	}
    }

    /**
     * Create a new Authenticated User
     * @param {String} name User name
     * @param {String} cryptedPassword Already crypted password
     * @param {String} email USer email
     * @param {Boolean} isAdmin User admin status, true or false
     * @returns {Object} new user if created, null otherwise
     */
    async addAuthenticatedUser(name, cryptedPassword, email, isAdmin) {
	assert.equal(typeof(name), 'string', "User name expected to be a string");
	assert.equal(typeof(cryptedPassword), 'string', "Password expected to be a string");
	assert.equal(typeof(email), 'string', "User email expected to be a string");
	assert.equal(typeof(isAdmin), 'boolean', "Admin mode expected to be a boolean");

	const user = {
	    login: name,
	    hash: cryptedPassword,
	    email: email,
	    isAdmin: isAdmin
	};

	const found_user = await this.findAuthenticatedUserByName(name);
	if (found_user === null) {
	    const user_db = new Schema(user);
	    const res = await user_db.save();
	    Logger.info('New AuthenticatedUser has been created: ' + name);
	    return res;
	}
	else {
	    Logger.warn('AuthenticatedUser has been found with the name ' + name + '. Impossible to created a new one with this name');
	    return null;
	}
	
    }

    /**
     * Check if there is an admin in the database. If not, it is the first time someone is connected to the database, force him to create a new one
     * @return true if it is the first connection, false otherwise
     */
    async isFirstConnection() {
	const found = await Schema.find({isAdmin: true});
	return found.length === 0;
    }

    /**
     * Update login of a authenticated user
     * @param {string} id user id
     * @param {string} newLogin login that will replace the old one
     */
    async updateLogin(id, newLogin) {
	assert.ok(newLogin.length > 5, 'string', "Login should be longer");
	try {
	    let mod = await Schema.findOneAndUpdate({_id: id}, { login: newLogin }, {new: true});
	    return mod;
	}
	catch(err) {
	    Logger.error('An error occured while trying to update admin login: ' + err);
	}
	return null;
    }

    /**
     * Update login of a authenticated user
     * @param {string} id user id
     * @param {string} newPassword new password hash
     */
    async updatePassword(id, newPassword) {
	try {
	    const mod = await Schema.findOneAndUpdate({_id: id}, { hash: newPassword }, {new: true});
	    return mod;
	}
	catch(err) {
	    Logger.error('An error occured while trying to update admin password ' + err);
	}
	return null;
    }

    /**
     * Update email of a authenticated user
     * @param {string} id user id
     * @param {string} newMail new email
     */
    async updateEmail(id, newMail) {	
	assert.ok(newMail.length > 5, 'string', "E-mail not valid");
	try {
	    const mod = await Schema.findOneAndUpdate({_id: id}, { email: newMail }, {new: true});
	    return mod;
	}
	catch(err) {
	    Logger.error('An error occured while trying to update admin email ' + err);
	}
	return null;
    }

    
};


module.exports = {
    DAL: new AuthenticatedUserDAL()
}
