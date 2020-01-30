/**
 * Replace with custom razzle config when needed.
 * @module razzle.config
 */

// const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

// const autoprefixer = require('autoprefixer');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const jsConfig = require('./jsconfig');
const path = require('path');
const fs = require('fs');
const glob = require('glob').sync;
const CompressionPlugin = require('compression-webpack-plugin');

const FILES_GLOB = '**/*.*(svg|png|jpg|jpeg|gif|ico|less|js|jsx)';

// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer');
const pathsConfig = jsConfig.compilerOptions.paths;
let voltoPath = './node_modules/@plone/volto';
Object.keys(pathsConfig).forEach(pkg => {
  if (pkg === '@plone/volto') {
    voltoPath = `./${jsConfig.compilerOptions.baseUrl}/${pathsConfig[pkg][0]}`;
  }
});

let config = require(`${voltoPath}/razzle.config`);
const razzleModify = config.modify;
/*
 * Returns the package path, potentially aliased by webpack, or from
 * node_modules
 */
function getPackageAliasPath(pkgName, aliases) {
  // Note: this relies on aliases already populated with addons. Should use
  // method below:
  // const addonsPaths = Object.values(pathsConfig).map(
  //   value => `${jsConfig.compilerOptions.baseUrl}/${value[0]}/`,
  // );
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
  return glob(`${pkgPath}${FILES_GLOB}`).filter(
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

  const paths = glob(`${customPath}${FILES_GLOB}`);

  const customizations = {};

  for (const filename of paths) {
    const targetPath = filename
      .replace(customPath, '')
      .replace(/\.(js|jsx)$/, '');

    const origPath = `@plone/volto/${targetPath}`;
    const origVoltoPath = path.join(
      voltoPath,
      'src',
      filename.replace(customPath, ''),
    );

    if (!fs.existsSync(origVoltoPath)) {
      console.warn(
        `Addon ${
          addon.name
        } customizes non-existing Volto file: ${origPath} at ${origVoltoPath}`,
      );
    }

    if (Object.keys(aliases).includes(origPath)) {
      console.warn(
        `Addon ${
          addon.name
        } customizes already existing alias: ${origPath} set to ${
          aliases[origPath]
        }`,
      );
    }
    console.info(
      `Volto Customization in ${addon.name}: ${origPath.replace(
        '@plone/volto',
        '',
      )}`,
    );

    customizations[origPath] = filename;
  }
  return customizations;
}

/*
 * Allows customization of addons by the package
 */
function customizeAddonByPackage(addon, customizationPath, aliases) {
  const customizations = {};
  const addonSources = addon.sources;
  addonSources.forEach(filename => {
    const localPath = path.join(customizationPath, filename);
    const moduleName = filename.replace(/\.(js|jsx)$/, '');
    if (fs.existsSync(localPath)) customizations[moduleName] = localPath;
  });
  return customizations;
}

// const projectRootPath = path.resolve('.');
// const voltoConfig = require(`${voltoPath}/razzle.config`);

module.exports = {
  plugins: [
    {
      name: 'bundle-analyzer',
      options: {
        analyzerHost: '0.0.0.0',
        analyzerMode: 'static',
        generateStatsFile: true,
        statsFilename: 'stats.json',
        reportFilename: 'reports.html',
        openAnalyzer: false,
      },
    },
  ],
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
    //
    // The frontend package can customize addons by having a folder with the
    // addon name in the "addonsCustomizationPath" folder, for example, to
    // customize volto-addons/actions.js, create a file and folder in
    // src/customizations/volto-addons/actions.js
    //
    // Note that, to be able to customize successfully, the addon code should
    // be changed to include the addon name in its imports. So, instead of
    // ``import { getSomething } from './actions'``, it should be rewritten
    // as ``import { getSomething } from 'volto-addons/actions``.

    // build a map of addon package source files
    const packageSources = {};
    for (const addonName of jsConfig.addons) {
      const pkgPath = getPackageAliasPath(addonName, vc.resolve.alias);
      const pkgBase = getPackageBasePath(pkgPath);
      const pkgJson = require(`${pkgBase}/package.json`);
      let voltoCustomizationPath =
        pkgJson['voltoCustomizationPath'] &&
        path.join(pkgBase, pkgJson['voltoCustomizationPath']);

      packageSources[addonName] = {
        name: addonName,
        path: pkgBase,
        sources: getPackageSourceFiles(pkgPath, voltoCustomizationPath).map(p =>
          path.join(addonName, p.replace(pkgPath, '')),
        ),
        voltoCustomizationPath,
      };
    }

    const projectRootPath = path.resolve('.');
    const addonsCustomizationPath = path.join(
      projectRootPath,
      require(`${projectRootPath}/package.json`).addonsCustomizationPath ||
        'src/customizations',
    );

    jsConfig.addons.forEach(name => {
      vc.resolve.alias = {
        ...customizeVoltoByAddon(packageSources[name], vc.resolve.alias),
        ...vc.resolve.alias,
      };
      vc.resolve.alias = {
        ...customizeAddonByPackage(
          packageSources[name],
          addonsCustomizationPath,
          vc.resolve.alias,
        ),
        ...vc.resolve.alias,
      };
    });

    // need to include /theme/ to less loader in order to have it working with volto as a submodule.
    const lessRule = vc.module.rules.find(
      module => module.test && module.test.toString() == /\.less$/, // eslint-disable-line
    );
    const index = vc.module.rules.indexOf(lessRule);
    lessRule.include.push(/src\/addons\/@plone\/volto\/theme/);
    vc.module.rules[index] = lessRule;

    const jsxRule = vc.module.rules.find(
      module => module.test && module.test.toString() == /\.(js|jsx|mjs)$/, // eslint-disable-line
    );
    const jsxIndex = vc.module.rules.indexOf(jsxRule);
    jsxRule.exclude = [/src\/addons\/.+\/node_modules/];
    vc.module.rules[jsxIndex] = jsxRule;

    console.log('aliases', vc.resolve.alias);
    console.log('----');
    console.log('rules', vc.module.rules);

    vc.plugins.push(new CompressionPlugin());

    // vc.module.rules.forEach((rule, i) => {
    //   console.log('rule', i, '-----');
    //   console.log(rule);
    //   console.log('rule options');
    //   console.log(rule.use && rule.use[0].options);
    // });
    // const hardSource = new HardSourceWebpackPlugin();
    // vc.plugins.push(hardSource);

    console.log('config', vc);

    return vc;
  },
};
