//API declaration for Express server (separated from the network related configuration
const express  = require('express'),
      app      = express(),
      path = require('path'),
      config = require('../config');

//app.set('superSecret', config.secret);
app.use(express.static(config.build.assetsRoot));



//set routes

module.exports = app;
