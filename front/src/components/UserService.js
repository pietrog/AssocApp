'use strict';

const util = require('util');
//import BackServerProxy from './BackServerProxy';
const proxy = require('./BackServerProxy').proxy;

class UserService extends proxy {
    
    constructor() {
	super('/users');
    }

    async getAllStudents() {
	const res = await this._get('/getAll');
	return res;
    }

    async createStudent(user) {
	return this._post('/addStudent', {user: user});
    }

    async deleteUser(userID) {
	return this._delete('/', userID);
    }

    async updateUser(user) {
	return this._update('/update', {user: user});
    }
};

module.exports.service = new UserService();
