/**
 * Replace with custom razzle config when needed.
 * @module razzle.config
 */
const jsConfig = require('./jsconfig').compilerOptions;

const pathsConfig = jsConfig.paths;
let voltoPath = './node_modules/@plone/volto';
Object.keys(pathsConfig).forEach(pkg => {
  if (pkg === '@plone/volto') {
    voltoPath = `./${jsConfig.baseUrl}/${pathsConfig[pkg][0]}`;
  }
});

const voltoConfig = require(`${voltoPath}/razzle.config`);

const razzleModify = voltoConfig.modify;

module.exports = {
  ...voltoConfig,
  plugins: ['forest-analyzer', ...voltoConfig.plugins],

  modify: (config, { target, dev }, webpack) => {
    const modifiedConfig = razzleModify(config, { target, dev }, webpack);
    modifiedConfig.module.rules[0].include.push('/opt/fise/volto-mosaic');
    return modifiedConfig;
  },
};
