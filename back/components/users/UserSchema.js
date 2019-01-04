let mongoose = require('mongoose');
let Schema   = mongoose.Schema;

function name_validation(val)
{
    return val.length > 1 && val.length < 100;
}

function email_validation(email)
{
    return true;
    //return email.match(/.*@.+\..*/);
}

function role_validation(role)
{
    return (
	role === 'student'
	    || role === 'staff'
	    || role === 'teacher'
	    || role === 'manager'
    );
}


function list_email_validation(email_array)
{
    let res = true;
    for (i = 0 ; i < email_array.length ; ++i)
    {
	res &= email_validation(email_array[i]);
	
    }
    return res;
}

let UserSchema = new Schema({
    firstname: {
	type: String,
	required: true,
	validate: name_validation
    },
    lastname: {
	type: String,
	required: true,
	validate: name_validation
    },
    inscription_date: {
	type: Number,
	required: true,
	default: (new Date(Date.now())).getTime()
    },
    role: {
	type: String,
	required: true,
	validate: role_validation
    },
    birthdate: {
	type: Number,
	required: true
    },
    emails: {
	type: [String],
	validate: list_email_validation
    },
    phone_number: {
	type: [String]
    }
    
});

module.exports = mongoose.model('UserSchema', UserSchema);
