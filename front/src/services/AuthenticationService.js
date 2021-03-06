'use strict';

const util = require('util');

const proxy = require('./BackServerProxy').proxy;

import store from '../store';

class AuthenticationService extends proxy{
    
    constructor() {
	super('/admin');

	//if there is a token in the store, try to connect with it !
	if (localStorage._token && localStorage._token != "null") {
	    store.commit('connect');
	}
    }

    getUser() {
	return localStorage._userLogin;
    }

    getEmail() {
	return localStorage._email;
    }

    isAdmin() {
	return localStorage._isAdmin;
    }

    getToken() {
	return 	localStorage._token;
    }

    getLoginDate() {
	return localStorage._loginDate;
    }

    getMessage() {
	return this._message;
    }
    
    async authenticate(user, password) {
	try {
	    const result = await this._post('/login', {login: user, password: password});
	    const data = result.data;
	    const status = data.status;
	    if (status === 0) {
		const loggedUser = data.data;
		localStorage._userLogin = loggedUser.login;
		localStorage._token = loggedUser.token;
		localStorage._loginDate = new Date(Date.now());
		localStorage._isAdmin = loggedUser.isAdmin;
		localStorage._email = loggedUser.email;
		localStorage._user_id = loggedUser._id;
		return true;
	    }
	    else {
		this._message = data.message;
		return false;
	    }
	}
	catch(err) {
	    return false;
	}

    }

    async updateLogin(newLogin) {
	try {
	    const result = await this._post('/updateLoginAdmin', { id_user: localStorage._user_id, login: newLogin });
	    if (result.data.status === 0) {
		localStorage._userLogin = newLogin;
	    }
	}
	catch(err)
	{
	    this._message = "Echec mise a jour du login";
	}	
    }

    async updatePassword(newPassword) {
	try {
	    const result = await this._post('/updatePasswordAdmin', { id_user: localStorage._user_id, password: newPassword });
	}
	catch(err)
	{
	    this._message = "Echec mise a jour du mot de passe";
	}	
    }
    
    async updateEmail(newEmail) {
	try {
	    const result = await this._post('/updateEmailAdmin', { id_user: localStorage._user_id, email: newEmail });
	    if (result.data.status === 0) {
		localStorage._email = newEmail;
	    }
	}
	catch(err)
	{
	    this._message = "Echec mise a jour de l'adresse email";
	}	
    }


    logout() {
	//@todo communication with server
	localStorage._userLogin = null;
	localStorage._token = null;
	localStorage._loginDate = null;
	localStorage._email = null;
	localStorage._isAdmin = false;
	localStorage._user_id = null;
    }
    
};

const service = new AuthenticationService();

export default service;
