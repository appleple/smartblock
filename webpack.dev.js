const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

// for not jsx users
module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  entry: {
    main: './examples/src/index.tsx',
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'css'),
    },
    host: '0.0.0.0',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './examples/index.html',
      filename: 'index.html',
    }),
  ]
});
