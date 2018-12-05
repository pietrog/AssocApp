'use strict';

const util = require('util');
import * from './BackServerProxy';

class UserService {//extends Proxy {
    
    constructor() {
	//super('/users');
    }

    async getAllStudents() {
	return "";//this._get('/getAll');
    }

    async createStudent(user) {
	return "";//this._post('/addStudent', {user: user});
    }

    async deleteUser(userID) {
	return "";//this._delete('/', userID);
    }

    async updateUser(user) {
	return "";//this._update('/update', {user: user});
    }
};

module.exports.US = new UserService();
