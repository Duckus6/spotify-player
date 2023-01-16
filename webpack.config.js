const path = require('path')
const nodeExternals = require('webpack-node-externals')

const {
	NODE_ENV = 'production',
} = process.env;
  
module.exports = {
	entry: './src/server/index.js',
	mode: NODE_ENV,
	watch: NODE_ENV = 'development',
	target: 'node',
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'index.js'
	},
	// module: {
	// 	rules:[{test: /\.js$/, use: 'raw-loader'}]
	// },
	resolve: {
	  extensions: ['.js'],
	},
	externals:[nodeExternals()]
  }