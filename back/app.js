//API declaration for Express server (separated from the network related configuration
const express  = require('express'),
      app      = express(),
      path = require('path'),
      config = require('../config');

const bodyParser  = require('body-parser');

const userRoutes = require('./express/user_routes');

const util = require('util');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//app.set('superSecret', config.secret);
app.use(express.static(config.build.assetsRoot));
app.use('/users', userRoutes);

app.get('*', (req, res) => {
    //console.log('coucou: ' + util.inspect(req));
});


//set routes

module.exports = app;
