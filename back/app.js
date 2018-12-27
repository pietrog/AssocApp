//API declaration for Express server (separated from the network related configuration
const express  = require('express'),
      app      = express(),
      path = require('path'),
      output_folder = require('../build/webpack.config').output_folder;

const bodyParser  = require('body-parser');

const userRoutes = require('./express/user_routes');
const eventRoutes = require('./express/event_routes');
const authenticationMiddle = require('./express/authentication');
const util = require('util');

//body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); //extract json from requests

app.use(express.static(output_folder)); //plugged on the output of webpack config

app.use(authenticationMiddle);
app.use('/users', userRoutes);
app.use('/events', eventRoutes);

app.get('*', (req, res) => {
    //console.log('coucou: ' + util.inspect(req));
});


//set routes

module.exports = app;
