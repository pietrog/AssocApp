/**
 * Normalize a port into a number, string, or false.
 */

module.exports.normalizePort =
    function normalizePort(val) {
	var port = parseInt(val, 10);
	
	if (isNaN(port)) {
	    // named pipe
	    return val;
	}
	
	if (port >= 0) {
	    // port number
	    return port;
	}
	
	return false;
    }

/**
 * Event listener for HTTP server "error" event.
 */
module.exports.onError =
    function onError(error) {
	if (error.syscall !== 'listen') {
	    throw error;
	}
	
	var bind = typeof port === 'string'
	    ? 'Pipe ' + port
	    : 'Port ' + port;
	
	// handle specific listen errors with friendly messages
	switch (error.code) {
	case 'EACCES':
	    console.error(bind + ' requires elevated privileges');
	    process.exit(1);
	    break;
	case 'EADDRINUSE':
	    console.error(bind + ' is already in use');
	    process.exit(1);
	    break;
	default:
	    throw error;
	}
    }

/**
 * Event listener for HTTP server "listening" event.
 */
module.exports.onListening = 
    function onListening() {
	var addr = server.address();
	var bind = typeof addr === 'string'
	    ? 'pipe ' + addr
	    : 'port ' + addr.port;
	debug('Listening on ' + bind);
    }

/**
 * Call console.log 
 */
module.exports.log =
    function red_log(msg) {
	console.log(msg);
    }


/**
 * Call console.log and display in red font
 */
module.exports.red_log =
    function red_log(msg) {
	console.log('\x1b[31m%s\x1b[0m', msg);
    }

/**
 * Call console.log and display in green font
 */
module.exports.green_log =
    function red_log(msg) {
	console.log("\x1b[32m%s\x1b[0m", msg);
    }

/**
 * Call console.log and display in cyan font
 */
module.exports.cyan_log =
    function red_log(msg) {
	console.log("\x1b[36m%s\x1b[0m", msg);
    }

/**
 * Call console.log and display in magenta font
 */
module.exports.magenta_log =
    function red_log(msg) {
	console.log("\x1b[35m%s\x1b[0m", msg);
    }
