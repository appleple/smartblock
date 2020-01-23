const path = require('path');
const { CheckerPlugin } = require('awesome-typescript-loader');

// for not jsx users
module.exports = {
  mode: "production",
  entry: {
    Editor: './src/adapter/index.tsx',
    Code: './src/extensions/code/index.tsx',
    Embed: './src/extensions/embed/index.tsx',
    Extensions: './src/extensions/index.tsx',
    Image: './src/extensions/image/index.tsx',
    Link: './src/extensions/link/index.tsx',
    Table: './src/extensions/table/index.tsx',
    Blockquote: './src/extensions/blockquote.tsx',
    BulletList: './src/extensions/bullet-list.tsx',
    CustomBlock: './src/extensions/custom-block.tsx',
    CustomMark: './src/extensions/custom-mark.tsx',
    DefaultKeys: './src/extensions/default-keys.tsx',
    DefaultPlugins: './src/extensions/default-plugins.tsx',
    Emphasis: './src/extensions/emphasis.tsx',
    Heading1: './src/extensions/heading1.tsx',
    Heading2: './src/extensions/heading2.tsx',
    Heading3: './src/extensions/heading3.tsx',
    Heading4: './src/extensions/heading4.tsx',
    Heading5: './src/extensions/heading5.tsx',
    Heading6: './src/extensions/heading6.tsx',
    ListItem: './src/extensions/list-item.tsx',
    MoveDown: './src/extensions/move-down.tsx',
    MoveUp: './src/extensions/move-up.tsx',
    OrderedList: './src/extensions/ordered-list.tsx',
    Paragraph: './src/extensions/paragraph.tsx',
    Strike: './src/extensions/strike.tsx',
    Strong: './src/extensions/strong.tsx',
    Trash: './src/extensions/trash.tsx',
    Underline: './src/extensions/underline.tsx'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: "bundle",
    filename: (data) => `${data.chunk.name.toLowerCase()}.js`,
    library: ["SmartBlock", '[name]'],
    libraryExport: "default",
    libraryTarget: 'umd'
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
