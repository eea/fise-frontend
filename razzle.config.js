/**
 * Replace with custom razzle config when needed.
 * @module razzle.config
 */

const jsConfig = require('./jsconfig').compilerOptions;
const CompressionPlugin = require('compression-webpack-plugin'); //gzip
const BrotliPlugin = require('brotli-webpack-plugin'); //brotli

const pathsConfig = jsConfig.paths;
let voltoPath = './node_modules/@plone/volto';
Object.keys(pathsConfig).forEach((pkg) => {
  if (pkg === '@plone/volto') {
    voltoPath = `./${jsConfig.baseUrl}/${pathsConfig[pkg][0]}`;
  }
});

module.exports = require(`${voltoPath}/razzle.config`);

module.exports = {
  ...module.exports,
  plugins: [
    ...module.exports.plugins,
    new CompressionPlugin({
      //gzip plugin
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.(js|css|html|svg)$/,
      threshold: 8192,
      minRatio: 0.8,
    }),
    new BrotliPlugin({
      //brotli plugin
      asset: '[path].br[query]',
      test: /\.(js|css|html|svg)$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
  ],
};
