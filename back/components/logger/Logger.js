const pino = require ('pino');

class Logger extends pino {

    constructor() {
	super();
	pino.level = 'trace';
    }
    
};


module.exports.logger = new Logger();
