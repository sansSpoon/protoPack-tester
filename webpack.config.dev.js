const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin'); //dev only
const autoprefixer = require('autoprefixer');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const webpack = require('webpack');

const publicPath = '';

module.exports = {
	devtool: 'inline-source-map',
	target: 'web', // 'node' | 'web'
	mode: 'development', //mode: 'development', // 'production' | 'development' | 'none' // > Moved to package.json scripts
	entry: './_src/_js/index.js',
	output: {
		filename: 'assets/js/[name].js',
		pathinfo: true,
		path: path.resolve(__dirname, 'public'),
		publicPath: publicPath,
	},
	devServer: {
		// contentBase: path.join(__dirname, 'public'),
		// hot: true,
	},
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: [
					{
						loader: 'style-loader',
					},
					{
						loader: 'css-loader',
						options: {
							// sourceMap: true,
							importLoaders: 2,
						},
					},
					// 'resolve-url-loader',
					{
						loader: 'postcss-loader',
						options: {
							ident: 'postcss',
							plugins: () => [
								// require('postcss-flexbugs-fixes'),
								// require('stylelint')(),
								// autoprefixer(),
								
								// require('autoprefixer')(),
								// require('cssnano')(),
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
							limit: 1024, // 8192
							// fallback: 'responsive-loader',
							
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
		new HtmlWebpackPlugin({
			inject: true,
			template: path.resolve(__dirname, '_src/_html/index.html'),
		}),
		new CleanWebpackPlugin(['public']), // might not be needed
		new StyleLintPlugin({
			configFile: './.stylelintrc.json',
			context: '_src',
			files: '**/*.scss', // '**/*.s?(a|c)ss'
			emitErrors: false,
			failOnError: false,
		}),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('development'),
		}),
		// new webpack.HotModuleReplacementPlugin()
	],
};
