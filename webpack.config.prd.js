const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin'); //dev only
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');

const publicPath = '';

module.exports = {
	devtool: 'source-map',
	target: 'web', // 'node' | 'web'
	//mode: 'development', // 'production' | 'development' | 'none' // > Moved to package.json scripts
	entry: './_src/_js/index.js',
	output: {
		filename: 'assets/js/[name].js',
		path: path.resolve(__dirname, 'public'),
		publicPath: publicPath,
	},
	optimization: {
		minimizer: [
			new UglifyJsPlugin({
				sourceMap: true,
				extractComments: true,
				uglifyOptions: {
					ecma: 8,
					warnings: false,
					safari10: true,
					parse: {},
					compress: {},
					mangle: {
						safari10: true,
					},
					output: {
						comments: false,
						beautify: false,
					},
					sourceMap: {},
				},
			})
		],
		splitChunks: {
			chunks: 'all',
		}
	},
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
					},
					{
						loader: 'css-loader',
						options: {
							importLoaders: 1,
							// minimize: true, // depreciated
							// sourceMap: true,
						},
					},
					{
						loader: 'postcss-loader',
						options: {
							ident: 'postcss',
							config: {
								ctx: {
									autoprefixer: {
										browsers: [
											'Chrome >= 45',
											'Firefox >= 27',
											'not Edge < 2000',
											'not IE < 2000',
											'iOS >= 7',
											'Safari >= 7'
										],
										// flexbox: 'no-2009',
									},
									cssnano: {},
								},
							},
							plugins: () => [
								// require('postcss-flexbugs-fixes'),
								// require('stylelint')(),
								// autoprefixer(),
								require('autoprefixer')(),
								require('cssnano')(),
							],
						},
					},
					{
						loader: 'sass-loader',
						options: {
							// sourceMap: true,
						},
					}
				],
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							name: 'assets/chrome/[name].[ext]',
							limit: 8192,
							// fallback: 'responsive-loader',
						},
					},
				]
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				sideEffects: false,
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
			}
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
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production'),
		}),
		new CleanWebpackPlugin(['public']), // might not be needed
	]
};
