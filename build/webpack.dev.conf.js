'use strict'
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const devWebpackConfig = merge(baseWebpackConfig, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
	clientLogLevel: 'warning',
	hot: true,
	quiet: true,
	compress: true,
	host: HOST || config.dev.host,
	port: PORT || config.dev.port,
	watchOptions: {
	    poll: config.dev.poll,
	}
    },
    plugins: [
	new webpack.HotModuleReplacementPlugin(),
	new HtmlWebpackPlugin({
	    title: "Dev Assoc App",
	    //filename: 'index.html',
	    template: 'index.html',
	    inject: true,
	    minify: {
		removeComments: true,
		collapseWhitespace: true,
		removeAttributeQuotes: true
		// more options:
		// https://github.com/kangax/html-minifier#options-quick-reference
	    },
	    // necessary to consistently work with multiple chunks via CommonsChunkPlugin
	    chunksSortMode: 'dependency'

	})
    ]
    
});

module.exports = devWebpackConfig;
