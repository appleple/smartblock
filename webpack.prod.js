const path = require('path');
const { CheckerPlugin } = require('awesome-typescript-loader');

module.exports = {
  mode: "production",
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [{
      test: /\.tsx?$/,
      exclude: /node_modules/,
      loader: 'awesome-typescript-loader'
    },{
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
    }]
  },
  plugins: [
    new CheckerPlugin
  ]
};
