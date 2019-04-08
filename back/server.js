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

const { AuthAPI, TokenAPI } = require('./components/authentication');

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
	this.m_env = process.env.NODE_ENV || 'development';
	this.m_server_started = false;
	this.m_http_server = http.Server(app);

    }

    isProduction() {
	return this.m_env === 'production';
    }

    /*
     * Start the http server, connect to database, and call and the middleware methods
     */
    async full_start_server() {
	try {
	    this.start_server();
	    await this.connect_to_database();
	    this.is_first_start();
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
	    logger.info("Server is now listening on " + this.m_listening_port + " in " + this.m_env + " mode"); 
	}
    }

    /*
     * Connect to database
     */
    async connect_to_database() {
	const db = this.isProduction() ? config.database : config.testdatabase;
	const connection = await mongoose.connect(db, { useNewUrlParser: true});
	logger.info(this.m_app_name + " is now connected to database " + db);
    }

    /*
     * Check if it is the first connection: look for an existing authenticated user. 
     *   --> If it finds it, it is not the first start, continue to normal process
     *   --> If it does not find it, add the default user: login = admin; password = password
     */
    async is_first_start() {
	const fc = await AuthAPI.isFirstConnection();
	if (fc) {
	    logger.info("Première connection au site de production, création de l'utilisateur par défault");
	    await AuthAPI.createAdmin("admin", "password", "achanger@email.fr");
	    logger.info("Utilisateur par défault créé, bienvenue !");
	}
	else
	{
	    logger.info("Démarrage normal");
	}
    }

};

module.exports.NodeServer = NodeServer;
