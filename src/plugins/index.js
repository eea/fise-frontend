const BundleAnalyzerPlugin = require('webpack-bundle-analyzer');

module.exports = function myRazzlePlugin(config, env, webpack, options) {
  const { target, dev } = env;

  const stats = `bundle-stats-${target}`.json;
  const report = `bundle-stats-${target}`.html;

  const webpackConfig = !dev
    ? {
        ...config,
        plugins: [
          ...config.plugins,
          new BundleAnalyzerPlugin.BundleAnalyzerPlugin({
            analyzerMode: 'static',
            generateStatsFile: true,
            statsFilename: stats,
            reportFilename: report,
            openAnalyzer: false,
          }),
        ],
      }
    : {};

  return webpackConfig;
};
