'use strict'

const rm = require('rimraf') // remove node module folder
const chalk = require('chalk') // terminal string styling
const ora = require('ora')  // nice displaying of a text (animation)
const path = require('path');

const webpack = require('webpack')

if ( process.argv.length === 3 && (process.argv[2] === 'development' || process.argv[2] === 'production')) {
    process.env['NODE_ENV'] = process.argv[2];
}
else {
    console.log(chalk.redBright('Expects mode, development or production'));
    console.log(chalk.red('When launching build.js, development or production is expected\n'));
    process.exit(1);
}

const output_folder = require('./webpack.config').output_folder;
const input_folder = require('./webpack.config').input_folder;
const config = require('./webpack.config').webpackConfig;

//nice build display
const spinner = ora('building for ' + process.env.NODE_ENV);
spinner.start();

//clean dist folder before build
rm(output_folder, err => {

    if (err) {
	spinner.stop()
	console.log(chalk.red('Error while cleaning the dist folder: ' + err));
	process.exit(1);
    }

    //launch webpack
    webpack(config, (err, stats) => {

	//stop the spinner, build is finished
	spinner.stop()
	
	if (err) {
	    console.log(chalk.redBright('Error while building: ' + err));
	    process.exit(1);
	}

	
	process.stdout.write(stats.toString({
	    colors: true,
	    modules: false,
	    children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
	    chunks: false,
	    chunkModules: false
	}) + '\n\n')
	
	if (stats.hasErrors()) {
	    console.log(chalk.red('  Build failed with errors.\n'))
	    process.exit(1)
	}
	
	console.log(chalk.cyan('  Build complete.\n'))
    })
})

