#!/usr/bin/env bash
set -Ex

if [ -z "$API_PATH" ]; then
  API_PATH="http://localhost:8080/fise"
fi

if [ -z "$INTERNAL_API_PATH" ]; then
  INTERNAL_API_PATH="http://backend:8080/fise"
fi

function apply_rebuild {
  mkdir -p /app/src/addons
  gosu node yarn develop
  gosu node yarn
  gosu node yarn build
}

# Should we re-build
test -n "$REBUILD" && apply_rebuild

function apply_path {
    mainjs=./build/server.js
    bundlejs=./build/public/static/js/*.js
    test -f $mainjs

    echo "Check that we have API_PATH and API vars"
    test -n "$API_PATH"

    echo "Changing built files inplace"
    sed -i "s#VOLTO_API_PATH#${API_PATH}#g" $mainjs
    sed -i "s#VOLTO_API_PATH#${API_PATH}#g" $bundlejs
    sed -i "s#VOLTO_INTERNAL_API_PATH#${INTERNAL_API_PATH}#g" $mainjs
    sed -i "s#VOLTO_INTERNAL_API_PATH#${INTERNAL_API_PATH}#g" $bundlejs

    echo "Zipping JS Files"
    gzip -fk $mainjs
}

# Should we monkey patch?
test -n "$API_PATH" && apply_path

if [[ "$1" == "yarn"* ]]; then
  echo "Starting Volto"
  exec gosu node "$@"
fi

exec "$@"