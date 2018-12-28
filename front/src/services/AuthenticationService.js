'use strict';

const util = require('util');

const proxy = require('../components/BackServerProxy').proxy;

class AuthenticationService extends proxy{
    
    constructor() {
	super('/admin');
	this._userLogin = null;
	this._token = null;
	this._loginDate = null;
	this._isAuthenticated = false;
	this._isAdmin = false;
	this._email = null;
	this._message = null;
    }

    isAuthenticated() {
	return this._isAuthenticated;
    }
    
    getUser() {
	return this._userLogin;
    }

    isAdmin() {
	return this._isAdmin;
    }

    getToken() {
	return this._token;
    }

    getLoginDate() {
	return this._loginDate;
    }

    getMessage() {
	return this._message;
    }
    
    async authenticate(user, password) {
	//@todo communication with server
	try {
	    const result = await this._post('/login', {login: user, password: password});
	    const data = result.data;
	    const status = data.status;
	    if (status === 0) {
		const loggedUser = data;
		this._userLogin = loggedUser.login;
		this._token = loggedUser.token;
		this._loginDate = new Date(Date.now());
		this._isAuthenticated = true;
		this._isAdmin = loggedUser.isAdmin;
		this._email = loggedUser.email;
		return true;
	    }
	    else {
		this._message = data.message;
		return false;
	    }
	}
	catch(err) {
	    console.log('eerror orccured: '+err);
	    return false;
	}

    }

    logout() {
	//@todo communication with server
	this._userLogin = null;
	this._token = null;
	this._loginDate = null;
	this._isAuthenticated = false;
    }
    
};

module.exports.service = new AuthenticationService();
