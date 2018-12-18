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
    
    async deleteOneEvent(id) {
	return this._delete('/oneEvent', id);
    }

    async deleteAllEventsByName(name) {
	return this._delete('/eventsByName', name);
    }

    
}


module.exports.service = new EventService();
