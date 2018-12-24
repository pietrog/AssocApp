const express  = require('express'),
      app      = express();

const { EventAPI, EventListAPI }  = require("../components/events");
const http_h   = require('./http_handlers');
const { CourseAPI }  = require("../components/courses");

const util = require('util');

app.get('/getAll', async (req, res) => {
    try {
	const result = await EventAPI.findEventByCritera({});
	http_h.success(res, "Liste des évènements", result);
    }
    catch (err) {
	http_h.error(res, "Problème pendant le chargement de la liste d'évènements: "+ err);
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
	const result = await EventAPI.addEventWithDuration(name, description, begin_date, duration, user_list, style);
	http_h.success(res, "Evènement " + name + " créé", result._id);
    }
    catch(err) {
	http_h.error(res, "Création d'évènement échouée: "+ err);
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
	const result = await CourseAPI.createCourse(name, description, first_start_date, duration, final_course_date, frequency, intensity, user_list, style);
	http_h.success(res, result.length + " évènements " + name + " créés", result._id);	
    }
    catch(err) {
	http_h.error(res, "Création d'évènements échoué: "+ err);
    }
});


app.delete('/oneEvent:id', async (req, res) => {
    try {
	const result = await EventAPI.deleteEvent(req.params.id);
	http_h.success(res, "L'évènement " + result.name + " a été supprimé");
    }
    catch (err) {
	http_h.error(res, "Suppression a échouée");
    }
});

app.delete('/eventsByName:name', async (req, res) => {
    try {
	const result = await EventAPI.deleteEventsByName(req.params.name);
	if (result.n === 1)
	    http_h.success(res, "L'évènement " + req.params.name + " a été supprimé");
	else
	    http_h.success(res, result.n + " évènements nommés " + req.params.name + " supprimés");
    }
    catch (err) {
	http_h.error(res, "Suppression de " + req.params.name + " a échouée");
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
