const { resolve } = require('path');
const CopyFilePlugin = require('copy-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');

module.exports = {
  webpack(config) {
    config.plugins.push(
      new CopyFilePlugin({
        patterns: [
          {
            context: '_posts',
            from: '**/*.{jpg,png}',
            to: resolve(__dirname, 'public/assets/images/posts'),
          },
        ],
      }),
      new WriteFilePlugin()
    );

    return (config);
  },
}
