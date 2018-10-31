'use strict'
const path = require('path')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const env = process.env.NODE_ENV === 'testing'
  ? require('../config/test.env')
  : require('../config/prod.env')

const webpackConfig = merge(baseWebpackConfig, {
    mode: 'production',
    plugins: [
	new HtmlWebpackPlugin({
	    title: "Assoc App",
	    filename: 'index.html',
	    inject: true
	}),
	//new BundleAnalyzerPlugin()
    ]
})

module.exports = webpackConfig
