/**
 * Replace with custom razzle config when needed.
 * @module razzle.config
 */

const { ReactLoadablePlugin } = require('react-loadable/webpack');
const jsConfig = require('./jsconfig').compilerOptions;

const pathsConfig = jsConfig.paths;
let voltoPath = './node_modules/@plone/volto';
Object.keys(pathsConfig).forEach(pkg => {
  if (pkg === '@plone/volto') {
    voltoPath = `./${jsConfig.baseUrl}/${pathsConfig[pkg][0]}`;
  }
});

const voltoConfig = require(`${voltoPath}/razzle.config`);

module.exports = {
  ...voltoConfig,
  // plugins: ['forest-analyzer', ...voltoConfig.plugins],

  modify: (config, { target, dev }, webpack) => {
    const vc = voltoConfig.modify(config, { target, dev }, webpack);

    vc.module.rules[0].include.push('./volto-mosaic');

    // need to include /theme/ to less loader in order to have it working with volto as a submodule.
    const modifiedLess = vc.module.rules.find(
      module => module.test && module.test.toString() == /\.less$/,
    );
    const index = vc.module.rules.indexOf(modifiedLess);
    modifiedLess.include.push(/theme/);
    vc.module.rules[index] = modifiedLess;

    console.log('vc', vc);
    vc.plugins = [
      ...vc.plugins,
      new ReactLoadablePlugin({
        filename: './build/react-loadable.json',
      }),
    ];

    return vc;
  },
};
