'use strict';

process.env.NODE_ENV = 'production';

const path = require('path');
const ora = require('ora')  // nice displaying of a text (animation)
const build = require('./build');
const webpackProdConfig = require('./webpack.prod.conf');


//start the build here !
const spinner = ora('building for production...');
spinner.start();
build(webpackProdConfig, spinner);
