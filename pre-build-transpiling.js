// One of the problems that you can run when running builds on ancient browsers is that
// some library maintainers stopped to build their packages into ES5 before release,
// leaving them in ES6. Since ancient browsers most probably didn't support yet the
// features used, then they break (eg. arrow functions in ie11). You should detect them
// by debugging the error messages in the ancient browser. Then take all this "offending
// packages" and add them to the `offendingPackages` const. This script takes all the
// "offending packages" in the node_modules and runs babel to transpile them to ES5 and
// make them compatible for ancient browsers before the build process
// REQUIREMENTS: yarn add shelljs --dev

const { echo, exec } = require('shelljs');

const offendingPackages = [
  './node_modules/prepend-http',
  './node_modules/url-parse-lax',
  // ... other offending packages you've might find
  './src/addons/volto-datablocks/node_modules/normalize-url',
  './src/addons/volto-plotlycharts/node_modules/normalize-url',
  './src/addons/volto-datablocks/node_modules/cacheable-request/node_modules/normalize-url',
  // './node_modules/parse-url/node_modules/normalize-url',
  // './node_modules/cacheable-request/node_modules/normalize-url',
  // './node_modules/postcss-normalize-url/node_modules/normalize-url',
  // './node_modules/get-urls/node_modules/normalize-url',
  // './node_modules/ip-regex',
  // './node_modules/npm/node_modules/ip-regex/',
  // './node_modules/npm/node_modules/cidr-regex/',
];

echo('\nPre-build transpiling to ES5 offending packages...\n');
offendingPackages.forEach(pkg =>
  exec(
    `NODE_ENV=production ./node_modules/.bin/babel --presets=@babel/env ${pkg} --out-dir ${pkg}`,
  ),
);
echo('\nPre-build transpiling finished.\n');
