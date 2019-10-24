const { resolve } = require('path');
const jsConfig = require('./jsconfig').compilerOptions;

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer');

const pathsConfig = jsConfig.paths;
let voltoPath = './node_modules/@plone/volto';
Object.keys(pathsConfig).forEach(pkg => {
  if (pkg === '@plone/volto') {
    voltoPath = `./${jsConfig.baseUrl}/${pathsConfig[pkg][0]}`;
  }
});

const { ReactLoadablePlugin } = require('react-loadable/webpack');

const voltoConfig = require(`${voltoPath}/razzle.config`);

const razzleModify = voltoConfig.modify;


module.exports = {
  modify: (config, { target, dev }, webpack) => {
    const vc = razzleModify(config, { target, dev }, webpack);
    // TODO: use find instead of hardcoding the index
    vc.module.rules[0].include.push(resolve('./volto-mosaic'));

    const stats = `bundle-stats-${target}`.json;
    const report = `bundle-stats-${target}`.html;

    const productionPlugins = !dev && [
      new ReactLoadablePlugin({
        filename: './build/react-loadable.json',
      }),
      // new BundleAnalyzerPlugin.BundleAnalyzerPlugin({
      //   analyzerMode: 'static',
      //   generateStatsFile: true,
      //   statsFilename: stats,
      //   reportFilename: report,
      //   openAnalyzer: false,
      // }),
    ] || []

    vc.plugins = [...vc.plugins, ...productionPlugins]

    // need to include /theme/ to less loader in order to have it working with volto as a submodule.
    const modifiedLess = vc.module.rules.find(
      module => module.test && module.test.toString() == /\.less$/,
    );
    const index = vc.module.rules.indexOf(modifiedLess);
    modifiedLess.include.push(/theme/);
    vc.module.rules[index] = modifiedLess;

    // console.log('vc', vc);
    // vc.plugins = [
    //   ...vc.plugins,
    //   new ReactLoadablePlugin({
    //     filename: './build/react-loadable.json',
    //   }),
    // ];

    return vc;
  },
};
