//init express, http server and attaches io socket
const express     = require('express'),
      express_app = express();
const http        = require('http'),
      http_server = http.Server(express_app);

//tools
const env         = process.env.NODE_ENV || 'development',
      bodyParser  = require('body-parser'),
      tools       = require('./tools'),
      path        = require('path'),
      mongoose    = require('mongoose'),
      config      = require('./config.js');

const util = require('util');

global.App = {
    font_red : '\x1b[31m%s\x1b[0m',
    font_green : "\x1b[32m%s\x1b[0m",
    appname : "AdminWebSiteBack",
    app : express_app,
    server: http_server,
    version: "0.1",
    mongoose_connection: mongoose.connect(config.database, { })
	.then(
	    () => {
		tools.green_log(global.appname + " is running...");
	    },
	    (err) => {
		tools.red_log("Connection to a MongoDB server failed. Check if a MongoDB daemon is running. ");
		process.exit(1);
	    }
	),
    port : tools.normalizePort(process.env.PORT || '3000'),
    root : path.join(__dirname, '..'),
    front_end: path.join(__dirname, '../dist'),
    appPath : function(path){
	return this.root + '/' + path;
    },
    require : function(path){
	return require(this.appPath(path));
    },
    env : env,
    start : function(){
	if (!this.started){
	    this.started = true;
	    this.server.listen(this.port);
	    tools.log('Running node server version ' + this.version + ' on port ' + this.port + ' in env ' + this.env ); 
	}
    }
}

//database connection
//App.app.set('superSecret', config.secret);


App.app.use(bodyParser.json());
App.app.use(express.static(App.front_end));
//App.app.use("/scripts", express.static(__dirname + "/node_modules/bootstrap/dist/js/"));
//App.app.use("/scripts", express.static(__dirname + "/../node_modules/bootstrap/dist/"));

//App.app.use('/api/device', r_device);

// Catch all other routes and return the index file
App.app.get('*', (req, res) => {
    console.log("Not caught by routes ! " + req.url);
    res.sendFile(path.join(App.front_end, 'index.html'));
});



module.exports = App;
