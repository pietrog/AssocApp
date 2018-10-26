'use strict'
const path = require('path')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf');

const env = process.env.NODE_ENV === 'testing'
  ? require('../config/test.env')
  : require('../config/prod.env')

const webpackConfig = merge(baseWebpackConfig, {
    mode: 'production'
})

module.exports = webpackConfig
