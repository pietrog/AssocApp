'use strict';

const EventSchema = require('./EventSchema'),
      assert = require('assert').strict,
      error_messages = require('./error_messages'),
      Logger = require('../logger').logger;

const util = require('util');

class EventDAL {
    
    constructor() {}


    
    /*
     * Look for an event given some critera
     *
     * @param {object} eventCrit JSon object describing the event we are looking for
     *
     * @returns {object} An array of json objects
     * @throws {BadTypeException} If the eventCrit object is not an object
     */
    lookForExistingEvent(eventCrit) {
	//check input
	assert.equal(typeof(eventCrit), 'object', error_messages.error_event_critera_validity);

	//build the object used for mongoose find
	const crit = {};

	if (typeof(eventCrit.name) === 'string') {
	    crit.name = eventCrit.name;
	}
	if (typeof(eventCrit.description) === 'string') {
	    crit.description = eventCrit.description;
	}
	/*if (typeof(eventCrit.begin_date_range_start) === 'number') {
	    assert.equal(typeof(eventCrit.begin_date_range_start), 'number', error_event_end_date_validity);
	    crit.begin_date_range_start = eventCrit.begin_date_range_start;
	    }*/
	return EventSchema.find(crit, null,
				{
				    sort: {
					begin_date: 1
				    }
				});
    }

    /*
     * @param {object} id id eventually corresponding to an existing event
     *
     * @returns {object} Json object describing the event
     * @throws {} 
     */
    lookForExistingEventByID(id) {
	assert.equal(typeof(id), 'object', error_messages.error_event_critera_validity);

	return EventSchema.findById(id);
    }
    
    /*
     * Create a new event 
     *
     * @param {string} name Event name
     * @param {string} description Event detailled description
     * @param {number} begin_date Event begin date (timestamp, without timezone)
     * @param {number} end_date Event end date (timestamp, without timezone)
     * @param {string} style 
     *
     * @returns {object} Event inserted (containing the _id)
     *
     * @throws {}
     */
    async addEvent(name, description, begin_date, end_date, style) {
	//check inputs
	assert.equal(typeof(name), 'string', error_messages.error_event_name_validity);
	assert.equal(typeof(description), 'string', error_messages.error_event_description_validity);
	assert.equal(typeof(begin_date), 'number', error_messages.error_event_begin_date_validity);
	assert.equal(typeof(end_date), 'number', error_messages.error_event_end_date_validity);
	assert.ok(begin_date < end_date, error_messages.error_begin_less_than_end_date);
	const event = {
	    name: name,
	    description: description,
	    begin_date: begin_date,
	    end_date: end_date,
	    add_date: Date.now(),
	    style: style
	};
	
	//check if an event with the same name and same dates exists
	const found_same_event = await EventSchema.find({
	    "$and": [
		{ "name": name },
		{
		    "$or": [
			//event inside this one
			{
			    "$and": [
				{
				    "begin_date": { "$gte": begin_date },
				    "end_date": { "$lte": end_date }
				}
			    ]
			},
			//overleaping by begin date
			{
			    "$and": [
				{
				    "begin_date": { "$lt": begin_date },
				    "end_date": { "$gt": begin_date },
				}
			    ]			    
			},
			//overleaping by begin date
			{
			    "$and": [
				{
				    "begin_date": { "$lt": end_date },
				    "end_date": { "$gt": end_date },
				}
			    ]			    
			}
		    ]
		}
	    ]
	});
	assert.equal(found_same_event.length, 0, error_messages.error_event_already_exists);

	//insert the event
	const event_db = new EventSchema(event);

	try {
	    const event_inserted = await event_db.save();
	    Logger.info('Event ' + event_inserted.name + ' inserted');
	    return event_inserted;
	}
	catch (err) {
	    Logger.error('Event ' + name + ' failed to insert (' + err +')');
	    return Promise.reject(new TypeError(error_messages.error_event_insertion + "(" + err + ")"));
	}
    }

    /**
     * @brief Remove an event given an id
     * @param {object} idEvent Mongoose id
     */
    deleteEventByID (idEvent) {
	assert.equal(typeof(idEvent), 'object');

	try {
	    Logger.info('Event deleted');
	    return EventSchema.findOneAndDelete({ _id: idEvent })
	}
	catch (err) {
	    Logger.error('Event with id ' + idEvent + ' failed to remove (' + err +')');
	    return Promise.reject(new TypeError('Event with id ' + idEvent + ' failed to remove (' + err +')'));
	}
    }

    /**
     * @brief Delete all events named name
     */
    async deleteEventsByName(name) {
	assert.equal(typeof(name), 'string', "Expects a string for name");

	try {
	    const res = await EventSchema.deleteMany({name: name});
	    Logger.info('Events named ' + name + ' deleted');
	    return res;
	}
	catch(err) {
	    Logger.error('Error while deleting events named ' + name);
	    return Promise.reject(new TypeError('Error while deleting events named ' + name));
	}
    }

    /**
     * @brief Update name of all events named new_name
     */
    async updateName (name, new_name) {
	assert.equal(typeof(name), 'string', "Expects a string for name");
	assert.equal(typeof(new_name), 'string', "Expects a string for new name");
	
	try {
	    const res = await EventSchema.updateMany({ name: name }, { name: new_name}) ;
	    Logger.info('Update name of all events named ' + name + " with name "+ new_name);	    
	    return res;
	}
	catch (err) {
	    Logger.error('Error while updating events named ' + name + '(' + err +')');
	    return Promise.reject(new TypeError('Error while updating events named ' + name + '(' + err +')'));
	}
    }

    /**
     * @brief Update user_list of all events named name
     */
    async updateUsers (name, user_list) {
	assert.equal(typeof(name), 'string', "Expects a string for name");
	assert(Array.isArray(user_list), "Expects a string for new name");
	
	try {
	    const res = await EventSchema.updateMany({ name: name }, { user_list: user_list}) ;
	    Logger.info('Update users of all events named ' + name + " with name "+ new_name);	    
	    return res;
	}
	catch (err) {
	    Logger.error('Error while updating events named ' + name + '(' + err +')');
	    return Promise.reject(new TypeError('Error while updating events named ' + name + '(' + err +')'));
	}
    }


    //@todo: complete it doc, excetpitons error handling!!
    async countEventsByName(name) {
	try {
	    const res = await EventSchema.find({name: name});
	    return res.length;
	}
	catch(err) {
	    return 0;
	}
	   
    }
    
};

module.exports.EventDAL = new EventDAL();
