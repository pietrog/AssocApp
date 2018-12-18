const express  = require('express'),
      app      = express();

const { EventAPI, EventListAPI }  = require("../components/events");
const { CourseAPI }  = require("../components/courses");

const util = require('util');

app.get('/getAll', async (req, res) => {
    try {
	const result = await EventAPI.findEventByCritera({});
	res.json(result);	
    }
    catch (err) {
	console.log(err);
	res.status(404).json([]);
    }
});


app.post('/createEvent', async (req, res) => {

    try {
	const name = req.body.course.title;
	const description = req.body.course.description || "";
	let begin_date = new Date(req.body.course.startDate);
	begin_date = begin_date.getTime();
	let duration = req.body.course.duration;
	const user_list = req.body.course.user_list;
	const style = req.body.course.style || "";
	const res = await EventAPI.addEventWithDuration(name, description, begin_date, duration, user_list, style);
	res.json("");
    }
    catch(err) {
	console.log(err);
	res.status(500).json(err);
    }
});

app.post('/createCourse', async (req, res) => {

    try {

	const name = req.body.course.title;
	const description = req.body.course.description || "";
	let first_start_date = new Date(req.body.course.startDate);
	first_start_date = first_start_date.getTime();
	let final_course_date = new Date(req.body.course.endDate);
	final_course_date = final_course_date.getTime();
	const frequency = req.body.course.frequency;
	const duration = req.body.course.duration;
	const intensity = 0;
	const user_list = req.body.course.user_list;
	const style = req.body.course.style || "";
	const res = await CourseAPI.createCourse(name, description, first_start_date, duration, final_course_date, frequency, intensity, user_list, style);
    }
    catch(err) {
	console.log(err);
	res.status(500).json(err);
    }
});


app.delete('/:id', async (req, res) => {
    try {
	res.json('');
    }
    catch (err) {
	console.log(err);
	res.status(500).json(err);	
    }
});

app.patch('/update', async(req, res) => {
    try{
	res.json('');
    }
    catch(err) {
	console.log(err);
	res.status(500).json('');
    }
});

module.exports = app;
