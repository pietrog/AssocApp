'use strict';

const jwt = require('jsonwebtoken');
const http_h = require('./http_handlers');
const Logger = require('../components/logger').logger,
      util = require('util');

/**
 * Basic authentication, static admin user, simple but it is okay right now !
 * @todo make something more robust, cf auth0
 */

const basic_authenticate = async (req, res, next) => {

    //get the token
    const token = req.body.token || req.query.token || req.headers['x-access-token'];

    const host_desc = {
	ip: req.ip,
	host: req.hostname,
	protocol: req.protocol
    };
    const host_desc_str = "IP:"+host_desc.ip+";HOST:"+host_desc.host+";PROTOCOL:"+host_desc.protocol;
    Logger.warn('Un utilisateur souhaite se connecter: ' + host_desc_str);
    //if 
    if (token) {
	try {
	    const decoded_token = await jwt.verify(token, 'superSecret');
	    req.decodedToken = decoded_token;
	    Logger.warn('Un utilisateur vient de s\'authentifier: ' + util.inspect(decoded_token));
	    next();
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
