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
	required: true,
	validate: login_validation
    },
    hash: {
	type: String,
	required: true
    },
    isAdmin: {
	type: Boolean,
	required: true
    },
    email: {
	type: String,
	required: true,
	validate: email_validation
    }
});

module.exports = mongoose.model('AuthenticatedUserSchema', AuthenticatedUserSchema);
