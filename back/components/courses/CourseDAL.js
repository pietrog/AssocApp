'use strict';

const CourseSchema = require('./CourseSchema'),
      assert = require('assert').strict,
      error_messages = require('./error_messages'),
      Logger = require('../logger').logger;

const EventListAPI = require('../events/index').EventListAPI,
      EventAPI = require('../events/index').EventAPI;

const util = require('util');

class CourseDAL {

    constructor() {
    }

    /*
     * Create a recurrent course, given a frequency
     *
     * @param {string} name
     * @param {string} description
     * @param {number} first_start_date
     * @param {number} duration
     * @param {number} final_course_date
     * @param {string} cron_frequency
     * @param {number} [intensity]
     *
     * @throws {}
     * @returns {object} Inserted object Course 
     */
    async createRecurrentCourse(name, description, first_start_date, duration, final_course_date, cron_frequency, intensity) {

	const event_list_object = null;

	//inputs are checked inside event or event list apis
	try {
	    //create event list
	    event_list_object =
		await EventListAPI.createRecurrentEvent(name, description, description, first_start_date, duration, cron_frequency, final_course_date);

	    //create the course
	    
	    Logger.info('Course ' + name + ' successfully created');
	    return course_db;
	    
	}
	catch(err) {
	    Logger.error('Course ' + event_inserted.name + ' failed to insert');
	    
	    // clean corresponding event list and event in case of course creation failure
	    if (event_list_object !=== null) {
		Logger.error('Failure while creating  course ' + event_inserted.name + ': delete all corresponding events');
	    }
	}

    }
    
};


module.exports.CourseDAL = new CourseDAL();
