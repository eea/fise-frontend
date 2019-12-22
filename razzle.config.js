/**
 * Replace with custom razzle config when needed.
 * @module razzle.config
 */

// const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const jsConfig = require('./jsconfig').compilerOptions;
const path = require('path');
const fs = require('fs');
const { map } = require('lodash');
const glob = require('glob').sync;

const pathsConfig = jsConfig.paths;
let voltoPath = './node_modules/@plone/volto';
Object.keys(pathsConfig).forEach(pkg => {
  if (pkg === '@plone/volto') {
    voltoPath = `./${jsConfig.baseUrl}/${pathsConfig[pkg][0]}`;
  }
});

let config = require(`${voltoPath}/razzle.config`);
const razzleModify = config.modify;

const projectRootPath = path.resolve('.');

module.exports = {
  modify: (config, { target, dev }, webpack) => {
    const vc = razzleModify(config, { target, dev }, webpack);

    const addonsPaths = Object.values(pathsConfig).map(
      value => `${jsConfig.baseUrl}/${value[0]}/`,
    );
    const addonCustomizationPaths = ['src/customizations/addons/'];
    function customizeAddons(addonCustomizationPaths, addonPath) {
      const _addonCustomizations = {};
      addonCustomizationPaths.forEach(customizationPath => {
        map(
          glob(
            `${customizationPath}**/*.*(svg|png|jpg|jpeg|gif|ico|less|js|jsx)`,
          ),
          filename => {
            const targetPath = filename.replace(customizationPath, addonPath);
            if (fs.existsSync(targetPath)) {
              _addonCustomizations[
                filename
                  .replace(
                    customizationPath,
                    path.join(projectRootPath, addonPath),
                  )
                  .replace(/\.(js|jsx)$/, '')
              ] = path.resolve(filename);
            } else {
              console.log(
                `The file ${filename} doesn't exist in the volto package (${targetPath}), unable to customize.`,
              );
            }
          },
        );
      });
      return _addonCustomizations;
    }
    let addonCustomizations = [];
    addonsPaths.forEach(addonPath => {
      addonCustomizations = [
        ...addonCustomizations,
        customizeAddons(addonCustomizationPaths, addonPath),
      ];
    });

    addonCustomizations.forEach(cust => {
      if (Object.keys(cust).length) {
        vc.resolve.alias = {
          ...vc.resolve.alias,
          ...cust,
        };
      }
    });
    // vc.module.rules.forEach((rule, i) => {
    //   console.log('rule', i, '-----');
    //   console.log(rule);
    //   console.log('rule options');
    //   console.log(rule.use && rule.use[0].options);
    // });
    // const hardSource = new HardSourceWebpackPlugin();
    // vc.plugins.push(hardSource);
    return vc;
  },
};
