const pino = require ('pino');

class Logger extends pino {

    constructor() {
	if (process.env.NODE_ENV === 'production') {
	    super('./logs/AssocAppServer.log');
	}
	else {
	    super();
	}
	
	//trace debug info warn error fatal
	pino.level = 'trace';
    }
    
};


module.exports.logger = new Logger();
