'use strict'
const path = require('path');

const { VueLoaderPlugin } = require('vue-loader');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const webpack = require('webpack');

//const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const NODE_ENV = process.env.NODE_ENV;
const output_folder = path.resolve(__dirname, '..', 'dist');
const input_folder = path.resolve(__dirname, '..', 'front');

const isProd = () => {
    return (NODE_ENV === 'production') ? true : false;
};


/*
 * Css extraction for easier css splitting
 */
const extractCSS = new MiniCssExtractPlugin({
    // Options similar to the same options in webpackOptions.output
    // both options are optional
    filename: 'css/[name].[hash].css',
    chunkFilename: 'css/[id].[hash].css',
});

const extractHTML = new HtmlWebpackPlugin({
    template: input_folder+'/index.html',
})


module.exports = {
    output_folder: output_folder,
    input_folder: input_folder,

    webpackConfig: {
    mode: NODE_ENV,
    //devtool: 'inline-source-map',
    watch: !isProd(),
    context: input_folder,
    entry: {
	index: './src/main.js',
    },
    resolve: {
	extensions: ['.js', '.vue', '.json'],
	alias: {
	    'vue$': 'vue/dist/vue.esm.js',
	    '@': path.resolve(input_folder, 'src')
	}
    },
    optimization: {
	runtimeChunk: false,
	splitChunks: {
	    chunks: "all" //Taken from https://gist.github.com/sokra/1522d586b8e5c0f5072d7565c2bee693
	}
    },
    plugins: [
	new VueLoaderPlugin(),
	new FriendlyErrorsPlugin(),
	new webpack.HotModuleReplacementPlugin(),
	//new BundleAnalyzerPlugin(),
	extractCSS,
	extractHTML
    ],
    module: {
	rules: [
	    {
		test: /\.vue$/,
		loader: 'vue-loader',
	    },
	    {
		test: /\.js$/,
		exclude: /(node_modules|bower_components)/,
		use: {
		    loader: 'babel-loader'
		}
	    },
	    {
		test: /\.(sa|sc|cs)s$/,
		use: [
		    {
			loader: isProd()? MiniCssExtractPlugin.loader: 'style-loader'
		    },
		    'css-loader',
		]
	    },
	    {
		test: /\.(png|jpg|gif)$/,
		loader: 'file-loader',
		query: {
		    name: '[name].[ext]?[hash]',
		    useRelativePath: !isProd()
		}
	    }    	    
	]
    },
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
}
