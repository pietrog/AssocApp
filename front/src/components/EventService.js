'use strict';

const proxy = require('./BackServerProxy').proxy;

class EventService extends proxy{
    
    constructor() {
	super('/events');
    }

    async getAllEvents() {
	return this._get('/getAll');
    }
    
    async createEvent(event) {
	return this._post('/createEvent', { course: event });
    }

    async createCourse(course) {
	return this._post('/createCourse', { course: course });
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


module.exports.service = new EventService();
