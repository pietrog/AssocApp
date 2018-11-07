'use strict';

process.env.NODE_ENV = 'development';

const path = require('path');
const ora = require('ora')  // nice displaying of a text (animation)
const build = require('./build');
const webpackDevConfig = require('./webpack.dev.conf');


//start the build here !
const spinner = ora('building for development...');
spinner.start();
build(webpackDevConfig, spinner);
