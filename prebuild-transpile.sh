#!/bin/bash

set -x
export NODE_ENV=production
find node_modules | grep "node_modules/prepend-http$" | xargs -I % ./node_modules/.bin/babel --presets="@babel/env" % --out-dir %
find node_modules | grep "node_modules/.*/node_modules/prepend-http$" | xargs -I % ./node_modules/.bin/babel --presets="@babel/env" % --out-dir %
find node_modules | grep "src/addons/.*/node_modules/prepend-http$" | xargs -I % ./node_modules/.bin/babel --presets="@babel/env" % --out-dir %

find node_modules | grep "node_modules/normalize-url$" | xargs -I % ./node_modules/.bin/babel --presets="@babel/env" % --out-dir %
find node_modules | grep "node_modules/.*/node_modules/normalize-url$" | xargs -I % ./node_modules/.bin/babel --presets="@babel/env" % --out-dir %
find node_modules | grep "src/addons/.*/node_modules/normalize-url$" | xargs -I % ./node_modules/.bin/babel --presets="@babel/env" % --out-dir %

find node_modules | grep "node_modules/ip-regex$" | xargs -I % ./node_modules/.bin/babel --presets="@babel/env" % --out-dir %
find node_modules | grep "node_modules/.*/node_modules/ip-regex$" | xargs -I % ./node_modules/.bin/babel --presets="@babel/env" % --out-dir %
find node_modules | grep "src/addons/.*/node_modules/ip-regex$" | xargs -I % ./node_modules/.bin/babel --presets="@babel/env" % --out-dir %

find node_modules | grep "node_modules/cidr-regex$" | xargs -I % ./node_modules/.bin/babel --presets="@babel/env" % --out-dir %
find node_modules | grep "node_modules/.*/node_modules/cidr-regex$" | xargs -I % ./node_modules/.bin/babel --presets="@babel/env" % --out-dir %
find node_modules | grep "src/addons/.*/node_modules/cidr-regex$" | xargs -I % ./node_modules/.bin/babel --presets="@babel/env" % --out-dir %

find node_modules | grep "node_modules/url-regex$" | xargs -I % ./node_modules/.bin/babel --presets="@babel/env" % --out-dir %
find node_modules | grep "node_modules/.*/node_modules/url-regex$" | xargs -I % ./node_modules/.bin/babel --presets="@babel/env" % --out-dir %
find node_modules | grep "src/addons/.*/node_modules/url-regex$" | xargs -I % ./node_modules/.bin/babel --presets="@babel/env" % --out-dir %
