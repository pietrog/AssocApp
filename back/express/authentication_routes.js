const express  = require('express'),
      app      = express();

const { AuthAPI, TokenAPI } = require('../components/authentication'),
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


app.post('/updateLoginAdmin', async (req, res) => {
    const id = req.body.id_user;
    const new_login = req.body.login;

    try {
	const user = await AuthAPI.updateLoginAdmin(id, new_login);
	if (!user) {
	    console.log('errrorrrrr');
	    http_h.error(res, "Echec de la mise à jour ");
	}
	else {
	    http_h.success(res, new_login + " mis à jour", user);
	}

    }
    catch(err) {
	http_h.error(res,  "Echec de la mise à jour du login: " + err);
    }
});

app.post('/updatePasswordAdmin', async (req, res) => {
    const id = req.body.id_user;
    const new_pwd = req.body.password;

    try {
	const hash = await TokenAPI.hashPassword(new_pwd);
	const user = await AuthAPI.updatePasswordAdmin(id, hash);
	if (!user) {
	    http_h.error(res, "Echec de la mise à jour ");
	}
	else {
	    http_h.success(res, "Mot de passe mis à jour", user);
	}

    }
    catch(err) {
	http_h.error(res,  "Echec de la mise à jour du mot de passe: " + err);
    }
});

app.post('/updateEmailAdmin', async (req, res) => {
    const id = req.body.id_user;
    const new_mail = req.body.email;

    try {
	const user = await AuthAPI.updateEmailAdmin(id, new_mail);
	if (!user) {
	    http_h.error(res, "Echec de la mise à jour ");
	}
	else {
	    http_h.success(res, new_mail + " mis à jour", user);
	}

    }
    catch(err) {
	http_h.error(res,  "Echec de la mise à jour du mail: " + err);
    }
});

module.exports = app;
