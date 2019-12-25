// const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

const jsConfig = require('./jsconfig');
const path = require('path');
const fs = require('fs');
const glob = require('glob').sync;

const pathsConfig = jsConfig.compilerOptions.paths;
let voltoPath = './node_modules/@plone/volto';
Object.keys(pathsConfig).forEach(pkg => {
  if (pkg === '@plone/volto') {
    voltoPath = `./${jsConfig.compilerOptions.baseUrl}/${pathsConfig[pkg][0]}`;
  }
});

let config = require(`${voltoPath}/razzle.config`);
const razzleModify = config.modify;

// const projectRootPath = path.resolve('.');

/*
 * Returns the package path, potentially aliased by webpack, or from
 * node_modules
 */
function getPackageAliasPath(pkgName, aliases) {
  let base = aliases[pkgName] || `./node_modules/${pkgName}`;
  if (!base.endsWith('/')) base = `${base}/`;
  return base;
}

/*
 * Finds the best "base" path for a package, the one that has package.json
 */
function getPackageBasePath(base) {
  while (!fs.existsSync(`${base}/package.json`)) {
    base = path.join(base, '../');
  }
  return path.resolve(base);
}

/*
 * Returns a list of all customizable source files
 */
function getPackageSourceFiles(pkgPath, blacklist = 'src/customizations') {
  return glob(`${pkgPath}**/*.*(svg|png|jpg|jpeg|gif|ico|less|js|jsx)`).filter(
    p => !(p.includes('node_modules') || p.includes(blacklist)),
  );
}

/*
 * Perform webpack resolve aliasing for an addon to customize Volto
 */
function customizeVoltoByAddon(addon, aliases) {
  let customPath = addon.voltoCustomizationPath;

  if (typeof customPath === 'undefined') return;

  if (!customPath.endsWith('/')) customPath += '/';

  const paths = glob(
    `${customPath}**/*.*(svg|png|jpg|jpeg|gif|ico|less|js|jsx)`,
  );

  for (const filename of paths) {
    const targetPath = filename
      .replace(customPath, '')
      .replace(/\.(js|jsx)$/, '');
    const origPath = `@plone/volto/${targetPath}`;
    if (Object.keys(aliases).includes(origPath)) {
      console.warn(
        `Addon ${
          addon.name
        } customizes already existing alias: ${origPath} set to ${
          aliases[origPath]
        }`,
      );
    }
    aliases[origPath] = filename;
    console.info(
      `Volto Customization in ${addon.name}: ${origPath.replace(
        '@plone/volto',
        '',
      )}`,
    );
  }
}

/*
 * Allows customization of addons by the package
 */
function customizeAddonByPackage(addon, aliases) {}

module.exports = {
  modify: (config, { target, dev }, webpack) => {
    const vc = razzleModify(config, { target, dev }, webpack);

    // The rule is: addon packages can customize Volto, but they can't
    // customize other addon packages
    // We (in the frontend package) can customize other addons
    // First we allow addons to customize Volto, then we come in and override
    // any such customization, then customize the addons themselves
    //
    // If any addon wants to customize Volto, it needs to write
    // a voltoCustomizationPath key in package.json, with the path to the
    // package-relative customization folder

    // build a map of addon package source files
    const packageSources = {};
    for (const addonName of jsConfig.addons) {
      const pkgPath = getPackageAliasPath(addonName, vc.resolve.alias);
      const pkgBase = getPackageBasePath(pkgPath);
      const pkgJson = require(`${pkgBase}/package.json`);
      let voltoCustomizationPath =
        pkgJson.voltoCustomizationPath &&
        path.join(pkgBase, pkgJson.voltoCustomizationPath);

      packageSources[addonName] = {
        name: addonName,
        path: pkgBase,
        sources: getPackageSourceFiles(pkgPath, voltoCustomizationPath).map(p =>
          path.join(addonName, p.replace(pkgPath, '')),
        ),
        voltoCustomizationPath,
      };
    }

    jsConfig.addons.forEach(name => {
      customizeVoltoByAddon(packageSources[name], vc.resolve.alias);
      customizeAddonByPackage(packageSources[name], vc.resolve.alias);
    });

    // console.log('package sources', packageSources);

    // TODO: this code is not documented, is hard to understand.
    // Explain what it does, explain if it can customize any addon
    // Log warnings if two addons customize the same path
    // const addonsPaths = Object.values(pathsConfig).map(
    //   value => `${jsConfig.compilerOptions.baseUrl}/${value[0]}/`,
    // );
    // const addonCustomizationPaths = ['src/customizations/addons/'];
    //
    // let addonCustomizations = [];
    // addonsPaths.forEach(addonPath => {
    //   addonCustomizations = [
    //     ...addonCustomizations,
    //     customizeAddons(addonCustomizationPaths, addonPath),
    //   ];
    // });
    //
    // addonCustomizations.forEach(cust => {
    //   if (Object.keys(cust).length) {
    //     vc.resolve.alias = {
    //       ...vc.resolve.alias,
    //       ...cust,
    //     };
    //   }
    // });
    // console.log('aliases', vc.resolve.alias);

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
