//init express, http server and attaches io socket
const app         = require('./app');
const http        = require('http');

const logger      = require('./components/logger').logger;

//tools
const env         = process.env.NODE_ENV || 'development',
      bodyParser  = require('body-parser'),
      tools       = require('./tools'),
      path        = require('path'),
      mongoose    = require('mongoose'),
      config      = require('./config.js');

const util = require('util');

/*
 * NodeServer class: use to configure and start the web server
 */
class NodeServer {

    constructor(port, env) {
	this.m_app_name = "AssocAppServer";
	this.m_listening_port = tools.normalizePort(port) || '3000';
	this.m_version = "0.1";
	this.m_front_end_path = path.join(__dirname, '../dist');
	this.m_env = "env";
	this.m_server_started = false;
	this.m_http_server = http.Server(app);
    }

    /*
     * Start the http server, connect to database, and call and the middleware methods
     */
    async full_start_server() {
	try {
	    this.start_server();
	    await this.connect_to_database();
	    logger.info(this.m_app_name + " has been successfully fully started ");
	}
	catch(err) {
	    logger.error("Error during " + this.m_app_name + " full start: " + err);
	    process.exit(1);
	}
    }
    
    /*
     * Start the web server, initially stopped
     */
    start_server() {
	if (!this.m_server_started) {
	    this.m_http_server.listen(this.m_listening_port);
	    this.m_server_started = true;
	    logger.info("Server is now listening on " + this.m_listening_port); 
	}
    }

    /*
     * Connect to database
     */
    async connect_to_database() {
	const connection = await mongoose.connect(config.testdatabase, { useNewUrlParser: true});
	logger.info(this.m_app_name + " is now connected to database " + config.testdatabase);
    }

};

//database connection
//

// Catch all other routes and return the index file
/*App.app.get('*', (req, res) => {
    console.log("Not caught by routes ! " + req.url);
    res.sendFile(path.join(App.front_end, 'index.html'));
});
*/

module.exports.NodeServer = NodeServer;