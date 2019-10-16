const BundleAnalyzerPlugin = require('webpack-bundle-analyzer');

// TODO: for some reason this prevents the razzle server from starting

module.exports = function myRazzlePlugin(config, env, webpack, options) {
  // const { target, dev } = env;
  // if (target === 'web') {
  //   // client only
  // }
  // if (target === 'server') {
  //   // server only
  // }
  // if (dev) {
  //   // dev only
  // } else {
  //   // prod only
  // }

  const webpackConfig = {
    ...config,
    plugins: [
      ...config.plugins,
      new BundleAnalyzerPlugin.BundleAnalyzerPlugin({
        analyzerMode: 'static',
        generateStatsFile: true,
        statsFilename: 'bundle-stats',
        reportFilename: 'bundle-report',
        openAnalyzer: false,
      }),
    ],
  };
  // modifiedConfig.plugins.push();

  // Do some stuff...
  return webpackConfig;
};
