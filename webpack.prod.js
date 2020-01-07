const path = require('path');
const { CheckerPlugin } = require('awesome-typescript-loader');

module.exports = {
  mode: "production",
  entry: {
    main: './demo.tsx'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      'react': 'preact/compat',
      "react-dom/test-utils": "preact/test-utils",
      'react-dom': 'preact/compat',
    }
  },
  module: {
    rules: [{
      test: /\.tsx?$/,
      exclude: /node_modules/,
      loader: 'ts-loader',
      options: {
        transpileOnly: true
      }
    },{
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
    },{
      test: /\.(woff|woff2|eot|ttf|svg)$/,
      loader: 'file-loader'
    }]
  },
  plugins: [
    new CheckerPlugin
  ]
};
