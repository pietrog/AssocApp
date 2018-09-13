let mongoose = require('mongoose');
let Schema   = mongoose.Schema;


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
