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
  // plugins: ['forest-analyzer', ...voltoConfig.plugins],

  modify: (config, { target, dev }, webpack) => {
    const modifiedConfig = razzleModify(config, { target, dev }, webpack);
    modifiedConfig.module.rules[0].include.push('/opt/fise/volto-mosaic');
    
    // need to include /theme/ to less loader in order to have it working with volto as a submodule.
    const modifiedLess = modifiedConfig.module.rules.find(module => module.test && module.test.toString() == /\.less$/)
    const index = modifiedConfig.module.rules.indexOf(modifiedLess)
    modifiedLess.include.push(/theme/)
    modifiedConfig.module.rules[index] = modifiedLess

    return modifiedConfig;
  },
};
