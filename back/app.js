//API declaration for Express server (separated from the network related configuration
const express  = require('express'),
      app      = express();

//app.set('superSecret', config.secret);
app.use(express.static(__dirname + "/../front"));
console.log(__dirname + "/../front");
app.use("/scripts", express.static(__dirname + "/../node_modules/vue/dist/"));	

//set routes

module.exports = app;
