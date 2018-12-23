const express  = require('express'),
      app      = express();

const UserAPI  = require("../components/users/").UserAPI,
      http_h   = require('./http_handlers');


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
    //user object from the client side
    const user = req.body.user;
    try {
	const result = await UserAPI.addStudent(user);
	const data = {
	    id: result._id,
	    message: user.firstname + " ajouté"
	};
	http_h.success(res,  data);
    }
    catch(err) {
	console.log('error: '+ err);
	http_h.error(res,  user.firstname + " " + user.lastname + " existe déjà");
    }
});

app.delete('/:id', async (req, res) => {
    try {
	const result = await UserAPI.removeUser(req.params.id);
	const message = result.firstname + ' a été supprimé'
	http_h.success(res, message);
    }
    catch (err) {
	http_h.error(res, "La suppression a échouée");
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
