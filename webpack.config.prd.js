const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin'); //dev only

const publicPath = '/';

module.exports = {
	target: 'web', // 'node' | 'web'
	//mode: 'development', // 'production' | 'development' | 'none' // > Moved to package.json scripts
	entry: './_src/_js/index.js',
	output: {
		filename: 'assets/js/[name].js',
		path: path.resolve(__dirname, 'public'),
		publicPath: publicPath,
	},
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
/*
						options: {
							publicPath: 'assets/css/',
						},
*/
					},
					'css-loader',
					'sass-loader',
				],
			},
			/*{
				test: /\.css$/,
				use: [
					{
						loader: 'style-loader/url',
						options: {
							//singleton: true,
						},
					},
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
							outputPath: '../css/',
							publicPath: 'assets/css/'
						},
					},
					'extract-loader',
					'css-loader',
				],
			},*/
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: 'assets/chrome/[name].[ext]',
							// outputPath: '../chrome/',
							//publicPath: 'assets/chrome/',
						},
					},
				]
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: [['env', {
								'targets': {
									'browsers': [
										'Chrome >= 45',
										'Firefox >= 27',
										'not Edge < 2000',
										'not IE < 2000',
										'iOS >= 7',
										'Safari >= 7'
									],
								},
							}]],
						},
					},
					{
						loader: "eslint-loader",
						options: {
							fix: false,
							cache: false, // true './node_modules/.cache'
							quiet: false, // Loader will process and report errors only and ignore warnings if this option is set to true
							emitWarning:true, // Enable for HMR in dev
							failOnWarning: false,
							emitError: true,
							failOnError: false,
						},
					}
				]
			},
		],
	},
	plugins: [
		new MiniCssExtractPlugin({
			// Options similar to the same options in webpackOptions.output
			// both options are optional
			filename: "assets/css/[name].css",
			chunkFilename: "[id].css"
		}),
		new HtmlWebpackPlugin({
			inject: true,
			template: path.resolve(__dirname, '_src/_html/index.html'),
		}),
		new CleanWebpackPlugin(['public']),
	]
};
