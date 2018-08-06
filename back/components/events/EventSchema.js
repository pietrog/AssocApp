let mongoose = require('mongoose');
let Schema   = mongoose.Schema;

function name_validation(val) {
    return val.length > 1 && val.length < 100;
}

function date_validation(val) {
    const lower_date = Date.parse("01 Sept 2017 00:00:00 GMT");
    const upper_date = Date.parse("01 Jan 2020 00:00:00 GMT");
    return (val >= lower_date && val <= upper_date)
}

const EventSchema = new Schema({
    name: {
	type: String,
	require: true,
	validate: name_validation
    },
    brief: {
	type: String,
	require: true
    },
    description: {
	type: String,
    },
    begin_date: {
	type: Number,
	require: true,
	validate: date_validation
    },
    end_date: {
	type: Number,
	require: true,
	validate: date_validation
    },
    add_date: {
	type: Number,
	validate: date_validation
    }
});

module.exports = mongoose.model('EventSchema', EventSchema);
