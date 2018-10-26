'use strict'
const path = require('path')
const config = require('../config')

function resolve (dir) {
    return path.join(__dirname, '..', dir)
}



module.exports = {
    mode: 'none',
    context: path.resolve(__dirname, '../front/'),
    entry: './src/main.js',
    output: {
	path: config.build.assetsRoot
    }
}
