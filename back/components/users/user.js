let mongoose = require('mongoose');
let Schema   = mongoose.Schema;

function name_validation(val)
{
    return val.length > 1 && val.length < 100;
}

function email_validation(email)
{
    return email.match(/.*@.+\..*/);
}

function list_email_validation(email_array)
{
    let res = true;
    for (var email in email_array)
    {
	res &= email_validation(email)
    }
    return res;
}

let User = new Schema({
    firstname: {
	type: String,
	require: true,
	validate: name_validation
    },
    lastname: {
	type: String,
	require: true,
	validate: name_validation
    },
    inscription_date: {
	type: Date,
	require: true,
	default: Date.now
    },
    birthday: {
	type: Date,
	require: true
    },
    emails: {
	type: [String],
	validate: list_email_validation
    },
    phone_number: {
	type: [String]
    }
    
});
