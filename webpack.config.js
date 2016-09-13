var path = require('path');
var webpack = require('webpack');

var config = {
  entry: {
    'build/bootstrap': './src/bootstrap'
  },
  output: {
    path: path.join(__dirname),
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          presets: ['es2015']
        }
      }
    ]
  }
};

module.exports = config;
