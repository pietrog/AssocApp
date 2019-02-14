const express  = require('express'),
      app      = express();

const { AuthAPI } = require('../components/authentication'),
      http_h   = require('./http_handlers');

app.post('/login', async (req, res) => {
    //user object from the client side
    const login = req.body.login;
    const password = req.body.password;
    
    try {
	if (!login || !password) {
	    http_h.error(res, "Il est nécessaire de s'authentifier");
	    return;
	}
	
	const loggedUser = await AuthAPI.loginUser(login, password);

	if (!loggedUser) {
	    http_h.error(res, "Echec de l'identification de " + login);
	}
	else {
	    http_h.success(res, login + " identifié avec succès", loggedUser);
	}
    }
    catch(err) {
	http_h.error(res,  "Echec de l'identification: " + err /*+ login + ": "+err*/);
    }
});

module.exports = app;
