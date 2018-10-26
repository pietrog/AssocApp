'use strict'

const rm = require('rimraf') // remove node module folder
const chalk = require('chalk') // terminal string styling
const webpack = require('webpack')


module.exports = (path, config, spinner) => {
    rm(path, err => {

	if (err) {
	    throw err;
	}

	//launch webpack
	webpack(config, (err, stats) => {

	    //stop the spinner, build is finished
	    spinner.stop()
	    if (err) {
		throw err;
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
};

