/* eslint-disable no-var */

var path = require('path');

module.exports = {
  entry: [
    './src/index.js',
  ],

  output: {
    path: path.join(__dirname, '../src/build'),
    filename: 'bundle.js',
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel-loader'],
      },
    ],
  },
};
