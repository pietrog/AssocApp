'use strict'
const path = require('path');
const config = require('../config');
const { VueLoaderPlugin } = require('vue-loader');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

module.exports = {
    mode: 'none',
    context: path.resolve(__dirname, '../front'),
    entry: {
	app: './src/main.js',
    },
    output: {
	filename: '[name].bundle.js',
	path: config.build.assetsRoot
    },
    resolve: {
	extensions: ['.js', '.vue', '.json'],
	alias: {
	    'vue$': 'vue/dist/vue.esm.js',
	    '@': path.join(__dirname, '..', 'front', 'src')
	}
    },

    module: {
	rules: [
	    {
		test: /\.css$/,
		use: [
		    'style-loader',
		    'css-loader'
		]
	    },
	    {
		test: /\.(png|svg|jpg|gif)$/,
		use: [
		    'file-loader'
		]
	    },
	    {
		test: /\.(woff|woff2|eot|ttf|otf)$/,
		use: [
		    'file-loader'
		]
	    },
	    {
		test: /\.(cvs|tsv)$/,
		use: [
		    'cvs-loader'
		]
	    },
	    {
		test: /\.xml$/,
		use: [
		    'xml-loader'
		]
	    },
	    {		
		test: /\.css$/,
		use: [
		    'style-loader',
		    'css-loader'
		]
	    },
	    {
		test: /\.vue$/,
		loader: 'vue-loader',
	    }

	]
    },
    plugins: [
	new VueLoaderPlugin(),
	new FriendlyErrorsPlugin()
    ],
    node: {
	// prevent webpack from injecting useless setImmediate polyfill because Vue
	// source contains it (although only uses it if it's native).
	setImmediate: false,
	// prevent webpack from injecting mocks to Node native modules
	// that does not make sense for the client
	dgram: 'empty',
	fs: 'empty',
	net: 'empty',
	tls: 'empty',
	child_process: 'empty'
    }    
}
