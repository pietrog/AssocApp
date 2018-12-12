const express  = require('express'),
      app      = express();

const UserAPI  = require("../components/users/").UserAPI;

const util = require('util');

app.get('/getAll', async (req, res) => {
    try {
	const users = await UserAPI.getAllUsers();
	res.json(users);	
    }
    catch (err) {
	console.log(err);
	res.status(404).json([]);
    }
});


app.post('/addStudent', async (req, res) => {

    try {
	
	const user = req.body.user;
	await UserAPI.addStudent(user);
	res.json("");
    }
    catch(err) {
	console.log(err);
	res.status(500).json(err);
    }
});

app.delete('/:id', async (req, res) => {
    try {
	await UserAPI.removeUser(req.params.id);
	res.json('');
    }
    catch (err) {
	console.log(err);
	res.status(500).json(err);	
    }
});

app.patch('/update', async(req, res) => {
    try{
	const user = req.body.user;
	const user_id = user._id;
	await UserAPI.updateUserByID(user_id, user);
	res.json('');
    }
    catch(err) {
	console.log(err);
	res.status(500).json('');
    }
});

module.exports = app;
