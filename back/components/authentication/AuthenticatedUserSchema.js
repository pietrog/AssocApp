let mongoose = require('mongoose');
let Schema   = mongoose.Schema;

function login_validation(val)
{
    return val.length > 1 && val.length < 100;
}

function email_validation(email)
{
    return true;
    //return email.match(/.*@.+\..*/);
}


const AuthenticatedUserSchema = new Schema({
    login: {
	type: String,
	require: true,
	validate: login_validation
    },
    hash: {
	type: String,
	require: true
    },
    isAdmin: {
	type: Boolean,
	require: true
    },
    email: {
	type: String,
	require: true,
	validate: email_validation
    }
});

module.exports = mongoose.model('AuthenticatedUserSchema', AuthenticatedUserSchema);
