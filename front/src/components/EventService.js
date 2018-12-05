'use strict';

const DALService = require('./DALService');

class EventService extends DALService{
    
    constructor() {
	super('/event/');
    }

    async getAllEvents() {
	return this._get('/getAll');
    }
    
    async createEvent(event) {
	const res = await axios.post(this.rootEvent + '', { user: user });
	return 
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


module.exports.service = new EventService();
