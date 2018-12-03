const express  = require('express'),
      app      = express();

const UserAPI  = require("../components/users/").UserAPI;

const util = require('util');

app.get('/getAll', async (req, res) => {
    /*const users =  [
      { firstname: "Odile", lastname: "Deray", birthdate: new Date(1999, 10, 10), id: 5, emails: [], phone_number: [] },
      { firstname: "Yann", lastname: "Dupuis", birthdate: new Date(2010, 9, 24), id: 1, emails: [], phone_number: [] },
      { firstname: "Woodz", lastname: "LeFou", birthdate: new Date(2007, 7, 19), id: 2, emails: [], phone_number: [] },
      { firstname: "Sympa", lastname: "Lecurieux", birthdate: new Date(2008, 3, 13), id: 3, emails: [], phone_number: [] },
      { firstname: "Emm", lastname: "Macron", birthdate: new Date(2004, 1, 6), id: 4, emails: [], phone_number: [] }
      ];*/
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

module.exports = app;
