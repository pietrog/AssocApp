'use strict';

const proxy = require('./BackServerProxy').proxy;

class EventService extends proxy{
    
    constructor() {
	super('/events');
    }
    
    getAllEvents() {
	return this._get('/getAll');
    }
    
    createEvent(event) {	
	return this._post('/createEvent', { course: event });
    }

    createCourse(course) {
	return this._post('/createCourse', { course: course });
    }
    
    deleteOneEvent(id) {
	return this._delete('/oneEvent', id);
    }

    deleteAllEventsByName(name) {
	return this._delete('/eventsByName', name);
    }

    
}


module.exports.service = new EventService();
