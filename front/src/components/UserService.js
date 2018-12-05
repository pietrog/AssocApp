'use strict';

const axios = require('axios');

class UserService {
    
    constructor() {
    }

    async getAllStudents() {
	const res = await axios.get('/users/getAll');
	return res.data;
    }

    async createStudent(user) {
	const res = await axios.post('/users/addStudent', { user: user });
	return res.data;
    }

    async deleteUser(userID) {
	await axios.delete('/users/' + userID);
	return ;
    }

    async updateUser(user) {
	await axios.patch('/users/update', { user: user });
	return;
    }
}

module.exports.US = new UserService();
