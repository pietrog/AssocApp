'use strict';

const EventListSchema = require('./EventSchema'),
      assert = require('assert').strict,
      error_messages = require('./error_messages'),
      Logger = require('../logger').logger,
      EventAPI = require('./EventAPI');

const util = require('util');

class EventListDAL {

    constructor() {}


    checkIfValueInArray(value, array) {
	for (let i = 0; i < array.length; ++i) {
	    
	    if (value == array[i]){
		console.log("value: " + value + ", array: " + array[i]);
		return true;
	    }
	}
	return false;
    }
    
    /*
     * Create a new recurrent Event 
     *
     * @param {string} name Event name
     * @param {string} brief Event brief description
     * @param {string} description Event detailled description
     * @param {number} first_start_date First date at which the event will occur
     * @param {number} duration Duration of the event in minutes
     * @param {string} frequency CRON-like frequency (cf https://en.wikipedia.org/wiki/Cron)
     **** ┌───────────── minute (0 - 59)
     **** │ ┌───────────── hour (0 - 23)
     **** │ │ ┌───────────── day of month (1 - 31)
     **** │ │ │ ┌───────────── month (1 - 12)
     **** │ │ │ │ ┌───────────── day of week (0 - 6) (Sunday to Saturday;
     **** │ │ │ │ │                                       7 is also Sunday on some systems)
     **** │ │ │ │ │
     **** │ │ │ │ │
     **** * * *  * *  command to execute
     * @param {number} final_event_date Final end date of the event. After this end date, this event no longer exists
     *
     * @returns {object} EventList object created 
     * @throws {}
     */
    async createRecurrentEvent(name, brief, description, first_start_date, duration, frequency, final_event_date) {
	//check inputs
	assert.equal(typeof(name), 'string', error_messages.error_event_name_validity);
	assert.equal(typeof(name), 'string', error_messages.error_event_brief_validity);
	assert.equal(typeof(description), 'string', error_messages.error_event_description_validity);
	assert.equal(typeof(frequency), 'string', error_messages.error_event_description_validity);

	//build all the events given the frequency
	const decomposition = frequency.split(" ");
	const minute = decomposition[0];
	const hour = decomposition[1];
	const day_of_month = decomposition[2]; // 0 - 31
	const month = decomposition[3]; // 0 - 11
	const day_of_week = decomposition[4]; // 0 - 6
	const days_of_week = day_of_week.split(",");

	let list_of_starts = [];
	let list_of_ends = [];
	//firstly we take in account only weekly event list (every monday or tuesday) at a given time
	//so we take in account only day of week
	//@todo extend this behavior (expects not only weekly but also more complex events)

	const duration_in_millisecs = duration * 60 * 1000;
	const millisecs_to_next_day = 24 * 3600 * 1000;

	let current_start_date = new Date(first_start_date.getTime());
	let current_end_date = new Date(first_start_date.getTime() + duration_in_millisecs);
	list_of_starts.push(current_start_date);
	list_of_ends.push(current_end_date);

	//increment to next day, same hour
	current_start_date = new Date(current_start_date.getTime() + millisecs_to_next_day);
	
	while (current_start_date.getTime() < final_event_date.getTime()) {
	    
	    while (!this.checkIfValueInArray(current_start_date.getDay(), days_of_week)) {
		current_start_date = new Date(current_start_date.getTime() + millisecs_to_next_day);
	    }
	    
	    list_of_starts.push(current_start_date);
	    list_of_ends.push(new Date(current_start_date.getTime() + duration_in_millisecs));
	    current_start_date = new Date(current_start_date.getTime() + millisecs_to_next_day);
	}

	//create all the events and save corresponding ids
	let list_of_ids = [];
	for (let i = 0; i < list_of_starts.length; ++i) {
	    const event = await EventAPI.addEvent(name, brief, description, list_of_starts[i].getTime(), list_of_ends[i].getTime());
	    list_of_ids.push(event._id);
	}

	//create event list db object
	const _event_list = {
	    name: name,
	    brief: brief,
	    description: description,
	    frequency: frequency,
	    listOfEvents: list_of_ids
	};
	const event_list_db = new EventListSchema(_event_list);

	try {
	    const inserted = event_list_db.save();
	    Logger.error('EventList ' + name + ' created (' + list_of_starts.length + " events)");
	    return inserted;
	}
	catch (err) {
	    Logger.error('EventList ' + name + ' creatioon failed');
	    return Promise.reject(new TypeError(error_messages.error_event_list_creation + "(" + err + ")"));
	}
	
    }
};

module.exports.EventListDAL = new EventListDAL();
