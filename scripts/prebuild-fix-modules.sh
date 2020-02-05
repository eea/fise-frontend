#!/bin/bash

set -x
export NODE_ENV=production

IFS=' '

ADDONS_DIR="./src/develop/"
NODE_MODULES=./node_modules

# declare remove inner packages as package.json:optimizeLiftPackages
REMOVE_INNER_PACKAGES=`./scripts/print_key.js optimizeLiftPackages`
read -ra REMOVE_PKGS <<< "$REMOVE_INNER_PACKAGES"

# declare remove inner packages as package.json:optimizeLiftPackages
TRANSPILE_PACKAGES=`./scripts/print_key.js manuallyTranspile`
read -ra REMOVE_PKGS <<< "$REMOVE_INNER_PACKAGES"

# Locate inner packages in ADDONS_DIR and NODE_MODULES, remove them
# Equivalent of doing:
# find node_modules | grep "node_modules/.*/node_modules/immutable$" | xargs rm -r

# optimize lifted packages in addons
for f in ${ADDONS_DIR}*/; do
  for PKG in "${REMOVE_PKGS[@]}"; do
    echo Will cleanup "${PKG}"
    find $f | grep "node_modules/${PKG}$" | xargs echo
  done;
done;

# optimize lifted packages in main node_modules
for PKG in "${REMOVE_PKGS[@]}"; do
  echo Will cleanup "${PKG}"
  find $1 | grep "node_modules/.*/node_modules/${PKG}$" | xargs echo
done



# find node_modules | grep "node_modules/prepend-http$" | xargs -I % ./node_modules/.bin/babel --presets="@babel/env" % --out-dir %
# find node_modules | grep "node_modules/.*/node_modules/prepend-http$" | xargs -I % ./node_modules/.bin/babel --presets="@babel/env" % --out-dir %
# find node_modules | grep "src/develop/.*/node_modules/prepend-http$" | xargs -I % ./node_modules/.bin/babel --presets="@babel/env" % --out-dir %
#
# find node_modules | grep "node_modules/normalize-url$" | xargs -I % ./node_modules/.bin/babel --presets="@babel/env" % --out-dir %
# find node_modules | grep "node_modules/.*/node_modules/normalize-url$" | xargs -I % ./node_modules/.bin/babel --presets="@babel/env" % --out-dir %
# find node_modules | grep "src/develop/.*/node_modules/normalize-url$" | xargs -I % ./node_modules/.bin/babel --presets="@babel/env" % --out-dir %
#
# find node_modules | grep "node_modules/ip-regex$" | xargs -I % ./node_modules/.bin/babel --presets="@babel/env" % --out-dir %
# find node_modules | grep "node_modules/.*/node_modules/ip-regex$" | xargs -I % ./node_modules/.bin/babel --presets="@babel/env" % --out-dir %
# find node_modules | grep "src/develop/.*/node_modules/ip-regex$" | xargs -I % ./node_modules/.bin/babel --presets="@babel/env" % --out-dir %
#
# find node_modules | grep "node_modules/cidr-regex$" | xargs -I % ./node_modules/.bin/babel --presets="@babel/env" % --out-dir %
# find node_modules | grep "node_modules/.*/node_modules/cidr-regex$" | xargs -I % ./node_modules/.bin/babel --presets="@babel/env" % --out-dir %
# find node_modules | grep "src/develop/.*/node_modules/cidr-regex$" | xargs -I % ./node_modules/.bin/babel --presets="@babel/env" % --out-dir %
#
# find node_modules | grep "node_modules/url-regex$" | xargs -I % ./node_modules/.bin/babel --presets="@babel/env" % --out-dir %
# find node_modules | grep "node_modules/.*/node_modules/url-regex$" | xargs -I % ./node_modules/.bin/babel --presets="@babel/env" % --out-dir %
# find node_modules | grep "src/develop/.*/node_modules/url-regex$" | xargs -I % ./node_modules/.bin/babel --presets="@babel/env" % --out-dir %

# optimize_lift_packages() {
#   for PKG in "${PKGS[@]}"; do
#     echo Will cleanup "${PKG}"
#     find $1 | grep "node_modules/.*/node_modules/${PKG}$" | xargs echo
#   done
# }
#optimize_lift_packages $ADDONS_DIR
