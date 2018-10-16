const pino = require ('pino');

class Logger extends pino {

    constructor() {
	super();
	this.level = 'error';
    }
    
    setLevel(level) {
	super.level = level;
    }
    
};


module.exports.logger = new Logger();
