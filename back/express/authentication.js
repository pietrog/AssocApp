'use strict';

const http_h = require('./http_handlers');
const Logger = require('../components/logger').logger,
      util = require('util');

const { AuthAPI } = require('../components/authentication');

/**
 * Basic authentication middleware function, static admin user, simple but it is okay right now !
 * @todo make something more robust, cf auth0
 */
const basic_authenticate = async (req, res, next) => {
    
    //get the token
    const token = req.headers['x-access-token'];

    const host_desc = {
	ip: req.ip,
	host: req.hostname,
	protocol: req.protocol
    };
    const host_desc_str = "IP:"+host_desc.ip+";HOST:"+host_desc.host+";PROTOCOL:"+host_desc.protocol;
    Logger.warn('Un utilisateur souhaite se connecter: ' + host_desc_str);
    //if 
    if (token) {
	const user_name = req.body.login;
	try {
	    console.log(req.body);
	    const isValidToken = await AuthAPI.authenticateUser(user_name, token);
	    
	    if (isValidToken) {
		Logger.info(user_name + ' successfully authenticated');
		next();
	    }
	    else {
		return http_h.unauthorized(res, "Token non valide");
	    }
	}	
	catch (err){
	    Logger.warn('Un utilisateur a tenté de s\'authentifier: ' + err);
	    return http_h.unauthorized(res, "Echec de l'authentification");
	}
    }
    else{
	Logger.info('Un utilisateur non identifié souhaite accéder au site. Redirection vers la page de login');
	return http_h.unauthorized(res, "Vous devez vous identifier");
    }
}

module.exports = basic_authenticate;
