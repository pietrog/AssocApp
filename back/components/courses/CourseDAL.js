'use strict';

const assert = require('assert').strict,
      error_messages = require('./error_messages'),
      Logger = require('../logger').logger,
      tools = require('../tools');

const EventAPI = require('../events').EventAPI;

const util = require('util');

class CourseDAL {

    constructor() {
    }

    /*
     * Check if a value is in the array
     * @param {number} value value to search
     * @param {array} array array of number where we want to seek for value
     * 
     * @returns {boolean} true if value has been found in array, false otherwise
     */
    checkIfValueInArray(value, array) {
	for (let i = 0; i < array.length; ++i) {
	    
	    if (value == array[i]){
		return true;
	    }
	}
	return false;
    }

    /*
     * Create a new recurrent Event 
     *
     * @param {string} name Event name
     * @param {string} description Event detailled description
     * @param {number} first_start_date First date at which the event will occur
     * @param {number} duration Duration of the event in minutes
     * @param {string} frequency CRON-like frequency (cf https://en.wikipedia.org/wiki/Cron)
     * @param {string} style css style for events
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
    async createRecurrentEvent(name, description, first_start_date_, duration, frequency, final_event_date_, intensity, style) {
	//check inputs
	assert.equal(typeof(name), 'string', "taguele: "+name/*error_messages.error_event_name_validity*/);
	assert.equal(typeof(description), 'string', error_messages.error_event_description_validity);
	assert.equal(typeof(frequency), 'string', error_messages.error_bad_frequency);
	assert.equal(typeof(first_start_date_), 'number', error_messages.error_event_begin_date_validity);
	const first_start_date = new Date(first_start_date_);
	const final_event_date = new Date(final_event_date_);

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

	//add the first event if it matches (greater or equal than now date) and day of week matching the expected frequency
	if (/*current_end_date.getTime() >= Date.now() && */this.checkIfValueInArray(current_start_date.getDay(), days_of_week)) {
	    list_of_starts.push(current_start_date);
	    list_of_ends.push(current_end_date);
	}

	//increment to next day, same hour
	current_start_date = new Date(current_start_date.getTime() + millisecs_to_next_day);
	
	while (current_start_date.getTime() < final_event_date.getTime()) {

	    //check for the matching day of week
	    while (!this.checkIfValueInArray(current_start_date.getDay(), days_of_week)) { 
		current_start_date = new Date(current_start_date.getTime() + millisecs_to_next_day);
	    }

	    if (current_start_date > final_event_date.getTime()) // break if we pass through the final date
		break;
	    
	    list_of_starts.push(current_start_date); // push the start date of the current event matching
	    list_of_ends.push(new Date(current_start_date.getTime() + duration_in_millisecs)); // push the end date of the current event matching
	    current_start_date = new Date(current_start_date.getTime() + millisecs_to_next_day); //go to next day
	}

	if (list_of_starts.length === 0)
	    return [];

	//create all the events and save corresponding ids
	let list_of_events = [];

	for (let i = 0; i < list_of_starts.length; ++i) {
	    const event = await EventAPI.addEvent(name, description, list_of_starts[i].getTime(), list_of_ends[i].getTime(), style);
	    list_of_events.push(event);
	}

	try {
	    Logger.info('EventList ' + name + ' created (' + list_of_starts.length + " events)");
	    return list_of_events;
	}
	catch (err) {
	    Logger.error('EventList ' + name + ' creatioon failed');
	    return Promise.reject(new TypeError(error_messages.error_event_list_creation + "(" + err + ")"));
	}
	
    }

    /*
     * Add a list of users to existing events
     * @param {string} name Events name
     * @param {array} user_list List of the users to add
     */
    async addUsersToCourse(name, user_list_) {
	
	let user_list = user_list_ || [];
	
	assert.equal(typeof(name), 'string', error_messages.error_course_id_expected);
	assert(Array.isArray(user_list), error_messages.error_user_id_list_expected);

	try {
	    //keep only user id not already in the course
	    let course = await EventAPI.findEventByCritera({name: name});

	    if (course.length == 0) {
		
	    	Logger.trace('No event named ' +name);
		return null;
	    }
	    
	    if (user_list.length === 0) {
		Logger.trace('Try to add no users in a course. Nothing happens.');
		return;
	    }

	    let merged_user_list = tools.mergeArrays(course[0].user_list || [], user_list);
	    
	    //save the modification
	    const res = await EventAPI.updateUsers(name, merged_user_list);
	    Logger.info('Events name ' + name + ' updated: users modified');
	}
	catch(err) {
	    Logger.error('Error happened while adding users to events: ' + err);
	}
    }


    /**
     * @brief Count the number of occurences found for a course name
     */
    async countEvents(name) {
	assert.equal(typeof(name), 'string', error_messages.error_course_id_expected);
	try {
	    const res = await EventAPI.countEventsByName(name);
	    return res;
	}
	catch (err) {
	    Logger.error('Error happened while counting events by name: ' + name + ' err: ' + err);
	    return 0;
	}
    }

    /**
     * @brief Find all events given a name
     * @param {string} name Events name
     * @returns {object} returns array of events named name
     */
    async getEventsByName (name) {
	assert.equal(typeof(name), 'string', 'String expected');
	try {
	    const res = await EventAPI.findEventByCritera({name: name});
	    Logger.trace('Found ' + res.length + ' events named ' + name);
	    return res;
	}
	catch(err) {
	    Logger.error('Error happened while looking for events by name: ' + name + ' err: ' + err);
	    return [];
	}
    }
    
};


module.exports.CourseDAL = new CourseDAL();
