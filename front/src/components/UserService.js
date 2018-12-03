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
	console.log('id: '+userID);
	await axios.delete('/users/' + userID);
	return ;
    }
}

module.exports.US = new UserService();
