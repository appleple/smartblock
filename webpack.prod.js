const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');

const standaloneConfig = merge(common, {
  mode: 'production',
  entry: {
    'Editor': './src/adapter/index.tsx',
    'Extensions': './src/extensions/index.tsx',
    'Base': './src/extensions/base.tsx',
    'Code': './src/extensions/code/index.tsx',
    'Cmbed': './src/extensions/embed/index.tsx',
    'Image': './src/extensions/image/index.tsx',
    'Link': './src/extensions/link/index.tsx',
    'Table': './src/extensions/table/index.tsx',
    'Blockquote': './src/extensions/blockquote.tsx',
    'BulletList': './src/extensions/bullet-list.tsx',
    'CustomBlock': './src/extensions/custom-block.tsx',
    'CustomMark': './src/extensions/custom-mark.tsx',
    'DefaultKeys': './src/extensions/default-keys.tsx',
    'DefaultPlugins': './src/extensions/default-plugins.tsx',
    'Emphasis': './src/extensions/emphasis.tsx',
    'Heading1': './src/extensions/heading1.tsx',
    'Heading2': './src/extensions/heading2.tsx',
    'Heading3': './src/extensions/heading3.tsx',
    'Heading4': './src/extensions/heading4.tsx',
    'Heading5': './src/extensions/heading5.tsx',
    'Heading6': './src/extensions/heading6.tsx',
    'ListItem': './src/extensions/list-item.tsx',
    'MoveDown': './src/extensions/move-down.tsx',
    'MoveUp': './src/extensions/move-up.tsx',
    'OrderedList': './src/extensions/ordered-list.tsx',
    'Paragraph': './src/extensions/paragraph.tsx',
    'Strike': './src/extensions/strike.tsx',
    'Strong': './src/extensions/strong.tsx',
    'Trash': './src/extensions/trash.tsx',
    'Underline': './src/extensions/underline.tsx',
  },
  output: {
    library: {
      name: ['SmartBlock', '[name]'],
      type: 'umd',
      export: 'default',
    },
    path: path.resolve(__dirname, 'dist/standalone'),
    filename: (data) => {
      if (data.chunk.name === 'Editor') {
        return 'index.js'
      }
      if (data.chunk.name === 'Extensions') {
        return 'extensions/index.js';
      }
      return `extensions/${data.chunk.name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()}.js`;
    },
  },
});

const defaultExportConfig = merge(common, {
  mode: 'production',
  entry: {
    'SmartBlock': './src/components/smartblock.tsx',
    'Extensions': './src/extensions/index.tsx',
    'Base': './src/extensions/base.tsx',
    'Code': './src/extensions/code/index.tsx',
    'Cmbed': './src/extensions/embed/index.tsx',
    'Image': './src/extensions/image/index.tsx',
    'Link': './src/extensions/link/index.tsx',
    'Table': './src/extensions/table/index.tsx',
    'Blockquote': './src/extensions/blockquote.tsx',
    'BulletList': './src/extensions/bullet-list.tsx',
    'CustomBlock': './src/extensions/custom-block.tsx',
    'CustomMark': './src/extensions/custom-mark.tsx',
    'DefaultKeys': './src/extensions/default-keys.tsx',
    'DefaultPlugins': './src/extensions/default-plugins.tsx',
    'Emphasis': './src/extensions/emphasis.tsx',
    'Heading1': './src/extensions/heading1.tsx',
    'Heading2': './src/extensions/heading2.tsx',
    'Heading3': './src/extensions/heading3.tsx',
    'Heading4': './src/extensions/heading4.tsx',
    'Heading5': './src/extensions/heading5.tsx',
    'Heading6': './src/extensions/heading6.tsx',
    'ListItem': './src/extensions/list-item.tsx',
    'MoveDown': './src/extensions/move-down.tsx',
    'MoveUp': './src/extensions/move-up.tsx',
    'OrderedList': './src/extensions/ordered-list.tsx',
    'Paragraph': './src/extensions/paragraph.tsx',
    'Strike': './src/extensions/strike.tsx',
    'Strong': './src/extensions/strong.tsx',
    'Trash': './src/extensions/trash.tsx',
    'Underline': './src/extensions/underline.tsx',
  },
  output: {
    library: {
      name: '[name]',
      type: 'umd',
      export: 'default',
    },
    path: path.resolve(__dirname, 'dist/umd'),
    filename: (data) => {
      if (data.chunk.name === 'SmartBlock') {
        return 'components/smartblock.js';
      }
      if (data.chunk.name === 'Extensions') {
        return 'extensions/index.js';
      }
      return `extensions/${data.chunk.name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()}.js`;
    },
  },
  externals: {
    react: 'react',
    'react-dom': 'react-dom',
  },
});

const namedExportConfig = merge(common, {
  mode: 'production',
  entry: {
    index: './src/index.tsx',
    'pm/commands': './src/pm/commands/index.ts',
    'pm/gapcursor': './src/pm/gapcursor/index.ts',
    'pm/history': './src/pm/history/index.ts',
    'pm/inputrules': './src/pm/inputrules/index.ts',
    'pm/keymap': './src/pm/keymap/index.ts',
    'pm/model': './src/pm/model/index.ts',
    'pm/schema-list': './src/pm/schema-list/index.ts',
    'pm/state': './src/pm/state/index.ts',
    'pm/tables': './src/pm/tables/index.ts',
    'pm/transform': './src/pm/transform/index.ts',
    'pm/utils': './src/pm/utils/index.ts',
    'pm/view': './src/pm/view/index.ts',
  },
  output: {
    library: {
      name: ['SmartBlock'],
      type: 'umd',
    },
    path: path.resolve(__dirname, 'dist/umd'),
    filename: (data) => `${data.chunk.name.toLowerCase()}.js`,
    globalObject: 'this',
  },
  externals: {
    react: 'react',
    'react-dom': 'react-dom',
  },
});

module.exports = [standaloneConfig, defaultExportConfig, namedExportConfig];
