'use strict'
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const devWebpackConfig = merge(baseWebpackConfig, {
    mode: 'development',
    devtool: 'inline-source-map',
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
