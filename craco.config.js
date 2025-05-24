const webpack = require('webpack');

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Add polyfills for Node.js core modules
      webpackConfig.resolve.fallback = {
        ...webpackConfig.resolve.fallback,
        buffer: require.resolve('buffer'),
        process: require.resolve('process'),
        util: false,
        stream: false,
        crypto: false,
        path: false,
        fs: false,
        os: false,
      };

      // Provide global variables
      webpackConfig.plugins = [
        ...webpackConfig.plugins,
        new webpack.ProvidePlugin({
          Buffer: ['buffer', 'Buffer'],
          process: 'process',
        }),
      ];

      return webpackConfig;
    },
  },
}; 