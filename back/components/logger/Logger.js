const pino = require ('pino');

class Logger extends pino {

    constructor() {
	super();
	this.level = 'info';
    }
    
    setLevel(level) {
	super.level = level;
    }
    
};


module.exports.logger = new Logger();
