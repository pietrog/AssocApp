//init express, http server and attaches io socket
const express     = require('express'),
      express_app = express();
const http        = require('http'),
      http_server = http.Server(express_app);

const logger      = require('./components/logger').logger;

//tools
const env         = process.env.NODE_ENV || 'development',
      bodyParser  = require('body-parser'),
      tools       = require('./tools'),
      path        = require('path'),
      mongoose    = require('mongoose'),
      config      = require('./config.js');

const util = require('util');

class NodeServer {

    constructor(port, env) {
	this.m_app_name = "AssocAppServer";
	this.m_listening_port = tools.normalizePort(port) || '3000';
	this.m_version = "0.1";
	this.m_front_end_path = path.join(__dirname, '../dist');
	this.m_env = "env";
	this.m_server_started = false;
	this.m_http_server = http_server;
	this.m_express_app = express_app;
	
	//mongoose connection
	try {
	    const connection = mongoose.connect(config.testdatabase, { useNewUrlParser: true});
	    logger.info(global.appname + " is running");
	}
	catch(err) {
	    logger.error("Connection to a MongoDB server failed. Check if a MongoDB daemon is running. ");
	    process.exit(1);
	}
	logger.info('Running node server version ' + this.m_version + ' on port ' + this.m_listening_port + ' in env ' + this.m_env ); 
    }

    start_server() {
	if (!this.m_server_started) {
	    this.m_http_server.listen(this.m_listening_port);
	    this.m_server_started = true;
	    logger.info("Server is now listening on " + this.m_listening_port); 
	}
    }

    init_middleware() {
	//this.m_express_app.use(bodyParser.json());
	this.m_express_app.use(express.static(__dirname + "/../dist"));
	this.m_express_app.get('/', (req, res) => {
	    res.send('helloooooo !!!');
	});
    }
};

//database connection
//App.app.set('superSecret', config.secret);

// Catch all other routes and return the index file
/*App.app.get('*', (req, res) => {
    console.log("Not caught by routes ! " + req.url);
    res.sendFile(path.join(App.front_end, 'index.html'));
});
*/

module.exports.NodeServer = NodeServer;
