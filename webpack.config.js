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
				exclude: /(node_modules|bower_components)/,
				use: {
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
								]
							}
						}]]
					}
				}
			}
		]
	}
};
