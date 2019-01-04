let mongoose = require('mongoose');
let Schema   = mongoose.Schema;

function name_validation(val) {
    return val.length > 1 && val.length < 100;
}

function date_validation(val) {
    const lower_date = Date.parse("01 Sept 2017 00:00:00 GMT");
    const upper_date = Date.parse("01 Jan 2025 00:00:00 GMT");
    return (val >= lower_date && val <= upper_date)
}

const EventSchema = new Schema({
    name: {
	type: String,
	required: true,
	validate: name_validation
    },
    description: {
	type: String,
	required: true
    },
    // begin date of the event
    begin_date: {
	type: Number,
	required: true,
	validate: date_validation
    },
    // end date of the event
    end_date: {
	type: Number,
	required: true,
	validate: date_validation
    },
    // date when the event was added
    add_date: {
	type: Number,
	validate: date_validation
    },
    // CSS Style for the event (backround-color, color, ...)
    style: {
	type: String,
	required: false
    },
    //List of users able to take the course
    user_list: {
	type: [ Schema.Types.ObjectId ],
	required: false
    },
});

module.exports = mongoose.model('EventSchema', EventSchema);
