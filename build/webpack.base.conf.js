'use strict'
const path = require('path');
const config = require('../config');
const { VueLoaderPlugin } = require('vue-loader');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

//const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const devMode = process.env.NODE_ENV !== 'production'

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
    /*optimization: {
      minimizer: [
      new UglifyJsPlugin({
      cache: true,
      parallel: true,
      sourceMap: true // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({})
      ]
      },*/
    module: {
	rules: [
	    {
		test: /\.(sa|sc|cs)s$/,
		use: [
		    devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
		    'css-loader',
		    /*{
			loader: 'postcss-loader',
			options: {
			    sourceMap: true
			}
		    }*/
		    //'sass-loader'
		]
	    },
	    /*{
	      test: /\.(sa|sc|c)ss$/,
	      use: [
	      devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
	      'css-loader',
	      'postcss-loader',
	      'sass-loader',
	      ],
	      },*/
	    {
		test: /\.vue$/,
		loader: 'vue-loader',
	    }

	]
    },
    plugins: [
	new VueLoaderPlugin(),
	new FriendlyErrorsPlugin(),
	new MiniCssExtractPlugin({
	    // Options similar to the same options in webpackOptions.output
	    // both options are optional
	    filename: 'css/[name].[hash].css',
	    chunkFilename: 'css/[id].[hash].css',
	})
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
