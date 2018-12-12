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
	const name = req.body.event.title;
	const brief = req.body.event.brief || "";
	const description = req.body.event.description || "";
	let begin_date = new Date(req.body.event.startDate);
	begin_date = begin_date.getTime();
	let end_date = new Date(req.body.event.endDate);
	end_date = end_date.getTime();
	const res = await EventAPI.addEvent(name, brief, description, begin_date, end_date);
	res.json("");
    }
    catch(err) {
	console.log(err);
	res.status(500).json(err);
    }
});

app.post('/createCourse', async (req, res) => {

    try {
	console.log(util.inspect(req.body));
	const name = req.body.course.title;
	const description = req.body.course.description || "";
	let first_start_date = new Date(req.body.course.startDate);
	first_start_date = first_start_date.getTime();
	let final_course_date = new Date(req.body.course.endDate);
	final_course_date = final_course_date.getTime();
	const frequency = req.body.course.frequency;
	const duration = req.body.course.duration;
	const intensity = 0;
	const res = await CourseAPI.createCourse(name, description, first_start_date, duration, final_course_date, frequency, intensity);
	res.json("coucou");
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
