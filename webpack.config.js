const path = require('path');

module.exports = {
	target: 'web', // 'node' | 'web'
	mode: 'development', // 'production' | 'development' | 'none'
	entry: './_src/_js/index.js',
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, 'public/assets/js/')
	}
};