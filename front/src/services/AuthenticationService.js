'use strict';

const util = require('util');

/*export default*/ class AuthenticationService {
    
    constructor() {
	this._userLogin = null;
	this._token = null;
	this._loginDate = null;
	this._isAuthenticated = false;
    }

    isAuthenticated() {
	return this._isAuthenticated;
    }
    
    getUser() {
	return this._userLogin;
    }

    getToken() {
	return this._token;
    }

    getLoginDate() {
	return this._loginDate;
    }

    authenticate(user, password) {
	//@todo communication with server
	this._userLogin = user;
	this._token = 'ok';
	this._loginDate = new Date(Date.now());
	this._isAuthenticated = true;
	return true;
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
