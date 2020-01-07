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
      'react': 'preact-compat',
      'react-dom': 'preact-compat',
      // Not necessary unless you consume a module using `createClass`
      'create-react-class': 'preact-compat/lib/create-react-class',
      // Not necessary unless you consume a module requiring `react-dom-factories`
      'react-dom-factories': 'preact-compat/lib/react-dom-factories'
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
