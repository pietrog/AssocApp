const pino = require ('pino');

class Logger extends pino {

    constructor() {
	super();
	//trace debug info warn error fatal
	pino.level = 'trace';
    }
    
};


module.exports.logger = new Logger();
