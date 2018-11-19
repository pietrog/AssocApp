'use strict';

const CourseSchema = require('./CourseSchema'),
      assert = require('assert').strict,
      error_messages = require('./error_messages'),
      Logger = require('../logger').logger;

const EventAPI = require('../events').EventAPI,
      EventListAPI = require('../events').EventListAPI;

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

	let event_list_object = null;

	//inputs are checked inside event or event list apis
	try {
	    //create event list
	    event_list_object =
		await EventListAPI.createRecurrentEvent(
		    name,
		    description,
		    description,
		    first_start_date,
		    duration,
		    cron_frequency,
		    final_course_date);

	    //create the course
	    let course = {
		name: name,
		description: description,
		frequency: "Implémenter la decomposition de la fréquence",
		event_list_id: event_list_object._id,
		user_list: []
	    };

	    const course_db = new CourseSchema(course);
	    await course_db.save();
	    Logger.info('Course ' + name + ' successfully created ');
	    return course_db;	    
	}
	catch(err) {
	    Logger.error('Course ' + name + ' failed to insert ' + err);
 	    
	    // clean corresponding event list and event in case of course creation failure
	    if (event_list_object !== null) {
		Logger.error('Failure while creating  course ' + event_inserted.name + ': delete all corresponding events');
	    }
	}

    }

    /*
     * Get the course from database corresponding to given id
     * @param {object} id Course id to find
     */
    async getCourse(id) {
	assert.equal(typeof(id), 'object', error_messages.error_course_id_expected);
	try {	    
	    let course = await CourseSchema.findOne({ _id: id });
	    if (course === null) {
		Logger.error('Course ' + id + " does not exist");	    
	    }
	    return course;
	}
	catch(err) {
	    Logger.error('Course ' + id + " not found");	    
	}

	return null;
    }

    /*
     * Find a course by its name
     * @param {string} name Course's name
     * @returns {object} Course list
     */
    async getCourseByName(name) {
	assert.equal(typeof(name), 'string', error_messages.error_course_name_expected);

	try {
	    return CourseSchema.find({ name: name });
	}
	catch(err) {
	    Logger.error('Course '+ name + ' not found');
	}
	return null;

    }

    /*
     * Merge two arrays in one, remove duplicates
     * @param {object} arrany_1 array to merge
     * @param {object} array_2 array to merge
     * @returns {object} Array resulting of merging the two inputed arrays, without duplicates
     */
    mergeTwoArrays(_array_1, _array_2) {

	assert.equal(typeof(_array_1), 'object', "Expects an array");
	assert.equal(typeof(_array_2), 'object', "Expects an array");

	//console.log("array1: " + util.inspect(_array_1));
	//console.log("array2: " + util.inspect(_array_2));	

	let array_1 = _array_1 || [];
	let array_2 = _array_2 || [];

	if (array_1.length === 0) {
	    return array_2;
	}
	if (array_2.length === 0) {
	    return array_1;
	}

	//otherwise merge, sort, and remove duplicates
	let merged_array = array_1.concat(array_2);
	let result = [];
	merged_array.sort();

	let previous_value = merged_array[0];
	result.push(previous_value);
	let idx = 1;
	
	while (idx < merged_array.length) {
	    if (!previous_value.equals(merged_array[idx])) {
		result.push(merged_array[idx]);
		previous_value = merged_array[idx];
	    }
	    ++idx;
	}
	//console.log("result: " + util.inspect(result));	
	return result;	
    }
    
    /*
     * Add a list of users to an existing course
     * @param {object} course_id Course database id
     * @param {array} user_list List of the users to add
     */
    async addUsersToCourse(course_id_, user_list_) {

	let course_id = course_id_ || null;
	let user_list = user_list_ || [];

	assert.equal(typeof(course_id), 'object', error_messages.error_course_id_expected);
	assert(Array.isArray(user_list), error_messages.error_user_id_list_expected);

	try {
	    //keep only user id not already in the course
	    let course = await this.getCourse(course_id);

	    if (course === null) {
		
	    	Logger.error('Course not found (' +course_id_+"'");
		return null;
	    }
	    
	    if (user_list.length === 0) {
		Logger.info('Try to add no users in a course. Nothing happens.');
		return;
	    }
	    let merged_user_list = this.mergeTwoArrays(course.user_list || [], user_list);
	    
	    //save the modification
	    await course.updateOne({user_list: merged_user_list});
	    Logger.info('Course ' + course._id + ' has been modified (user list)');
	}
	catch(err) {
	    Logger.error('Error happened while adding users to a course: ' + err);
	}
    }
    
};


module.exports.CourseDAL = new CourseDAL();
