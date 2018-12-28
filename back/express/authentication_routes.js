const express  = require('express'),
      app      = express();

const { AuthAPI } = require('../components/authentication'),
      http_h   = require('./http_handlers');

app.post('/login', async (req, res) => {
    //user object from the client side
    console.log('coucou ici');
    const login = req.body.login;
    const password = req.body.password;
    
    try {
	const loggedUser = await AuthAPI.loginUser(login, password);
	if (loggedUser === null) {
	    http_h.error(res, "Echec de l'identification de " + login);
	}
	else {
	    http_h.success(res, login + " identifié avec succès", loggedUser);
	}
    }
    catch(err) {
	http_h.error(res,  "Echec de l'identification de " /*+ login + ": "+err*/);
    }
});

module.exports = app;
