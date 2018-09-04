'use strict';

const EventListSchema = require('./EventSchema'),
      assert = require('assert').strict,
      error_messages = require('./error_messages'),
      Logger = require('../logger').logger;

const util = require('util');

class EventListDAL {

    constructor() {}

    /*
     * Create a new recurrent Event 
     *
     * @param {string} name Event name
     * @param {string} brief Event brief description
     * @param {string} description Event detailled description
     * @param {string} frequency CRON-like frequency (cf https://en.wikipedia.org/wiki/Cron)
     * ┌───────────── minute (0 - 59)
     * │ ┌───────────── hour (0 - 23)
     * │ │ ┌───────────── day of month (1 - 31)
     * │ │ │ ┌───────────── month (1 - 12)
     * │ │ │ │ ┌───────────── day of week (0 - 6) (Sunday to Saturday;
     * │ │ │ │ │                                       7 is also Sunday on some systems)
     * │ │ │ │ │
     * │ │ │ │ │
     * * * *  * *  command to execute
     * @param {number} duration Final end date of the event. After this end date, this event no longer exists
     *
     * @returns {object} EventList object created 
     * @throws {}
     */
    createRecurrentEvent(name, brief, description, frequency, duration) {
	//check inputs
	assert.equal(typeof(name), 'string', error_messages.error_event_name_validity);
	assert.equal(typeof(name), 'string', error_messages.error_event_brief_validity);
	assert.equal(typeof(description), 'string', error_messages.error_event_description_validity);
	assert.equal(typeof(frequency), 'string', error_messages.error_event_description_validity);

	//build all the events given the frequency
	const decomposition = frequency.split(" ");
	const minute = decomposition[0];
	const hour = decomposition[1];
	const day_of_month = decomposition[2];
	const month = decomposition[3];
	const day_of_week = decomposition[4];

	//firstly we take in account only weekly event list (every monday or tuesday) at a given time
	const today = new Date(Date.now());
	const first_next_date = 
	
    }
};

module.exports.EventListDAL = new EventListDAL();
