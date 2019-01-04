let mongoose = require('mongoose');
let Schema   = mongoose.Schema;

function name_validation(val)
{
    return val.length > 1 && val.length < 100;
}

function message_validation(val)
{
    return val.length > 1 && val.length < 500;
}

function prio_validation(val) {
    if (val === 1 || val === 2 || val ===3)
	return true;
    return false;
}



/**
 * Reprensents a single entry in the blog
 */
let EntrySchema = new Schema({
    //title of the entry, should be unique
    title: {
	type: String,
	required: true,
	validate: name_validation
    },
    // Priority of the publication through the blog: 1 = HIGH ; 2 = MEDIUM ; 3 = LOW
    priority: {
	type: Number,
	required: true,
	validation: prio_validation
    },
    //date of the creation of this entry
    creation_date: {
	type: Number,
	default: (new Date(Date.now())).getTime()
    },
    //start date of the publication of the entry, defaulted to -1, meaning it will be publicated immediatelly 
    publication_date: {
	type: Number,
	default: -1
    },
    expiry_date: {
	type: Number,
	required: true,
	default: -1 //means that it has no expiry
    },
    //content of the message
    message: {
	type: String,
	required: true,
	validate: message_validation
    },
    //pictures to display like jpg, bmp
    pictures: { 
	type: [String]
    },
    // other type of documents like pdf, word, ...
    other_documents: {
	type: [String]
    }
    
});

module.exports = mongoose.model('EntrySchema', EntrySchema);
