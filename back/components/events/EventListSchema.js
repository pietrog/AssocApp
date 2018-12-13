let mongoose = require('mongoose');
let Schema   = mongoose.Schema;


/**
 * Represents a list of events. It keeps the trace of the frequency used for generating everything
 */
const EventListSchema = new Schema({
    name: {
	type: String,
	require: true,
	//validate: name_validation
    },
    brief: {
	type: String,
	require: true
    },
    description: {
	type: String,
    },
    frequency: {
	type: String,
	require: true
    },
    listOfEvents: {
	type: [ Schema.Types.ObjectId ],
	require: true
    }
});

module.exports = mongoose.model('EventListSchema', EventListSchema);
