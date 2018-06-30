const path = require('path');

module.exports = {
	target: 'web', // 'node' | 'web'
	mode: 'development', // 'production' | 'development' | 'none'
	entry: './_src/_js/index.js',
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, 'public/assets/js/')
	},
	module: {
		rules: [
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
};
