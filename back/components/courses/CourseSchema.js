let mongoose = require('mongoose');
let Schema   = mongoose.Schema;

const CourseSchema = new Schema({
    //Course name (ex: Entrainement combat)
    name: {
	type: String,
	require: true
    },
    //Course description (ex: Cours orienté combat, entrainement oriente physique et tactique)
    description: {
	type: String,
	require: true
    },
    //Course frequency (ex: Mardi, Jeudi)
    frequency: {
	type: String,
	require: true
    },
    //Event list corresponding to this course
    event_list_id: {
	type: Schema.Types.ObjectId,
	require: true
    },
    event_id: {
	type: Schema.Types.ObjectId,
	require: true
    }
    //List of users able to take the course
    user_list: {
	type: [ Schema.Types.ObjectId ]
    },
    //Physical intensity (between 1 and 5, 1 is cool, 5 is hard !!)
    intensity: {
	type: Number
    }
    
});


module.exports = mongoose.model('CourseSchema', CourseSchema);
