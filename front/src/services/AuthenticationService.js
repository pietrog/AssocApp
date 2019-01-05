'use strict';

const util = require('util');

const proxy = require('./BackServerProxy').proxy;

import store from '../store';

class AuthenticationService extends proxy{
    
    constructor() {
	super('/admin');

	if (localStorage._token) {
	    console.log('user may be already connected');
	    store.commit('connect');
	}
    }

    getUser() {
	return localStorage._userLogin;
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
	    console.log(data);
	    const status = data.status;
	    if (status === 0) {
		const loggedUser = data.data;
		localStorage._userLogin = loggedUser.login;
		localStorage._token = loggedUser.token;
		localStorage._loginDate = new Date(Date.now());
		localStorage._isAdmin = loggedUser.isAdmin;
		localStorage._email = loggedUser.email;
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

    logout() {
	//@todo communication with server
	localStorage._userLogin = null;
	localStorage._token = null;
	localStorage._loginDate = null;
	localStorage._email = null;
	localStorage._isAdmin = false;
    }
    
};

const service = new AuthenticationService();

export default service;
