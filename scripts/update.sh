#!/bin/bash
DEPENDENCIES=$(jq -r '.dependencies|keys[]' package.json)
for dependency in $DEPENDENCIES; do
    echo "| $dependency"
    yarn add "$dependency" > /dev/null 2>&1
    version=$(jq -r ".dependencies[\"$dependency\"]" package.json)
    echo "|- $version"
done
