'use strict';

const util = require('util');
//import BackServerProxy from './BackServerProxy';
const proxy = require('./BackServerProxy').proxy;

class UserService extends proxy {
    
    constructor() {
	super('/users');
    }

    getAllStudents() {
	return this._get('/getAll');
    }

    createStudent(user) {
	return this._post('/addStudent', {user: user});
    }

    deleteUser(userID) {
	return this._delete('/', userID);
    }

    updateUser(user) {
	return this._update('/update', {user: user});
    }
};

module.exports.service = new UserService();
