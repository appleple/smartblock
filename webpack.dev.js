const merge = require('webpack-merge');
const prod = require('./webpack.prod.js');

module.exports = merge(prod, {
  mode: "development",
  entry: {
    main: './demo.tsx'
  },
  devtool: 'inline-source-map',
  devServer: {
    port: 3000,
    inline: true,
    open: true,
    openPage: 'example'
  },
});
