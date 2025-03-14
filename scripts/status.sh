#!/bin/bash

for repo in $(ls src/addons); do
  if [ ! -d "src/addons/$repo" ]; then
    continue
  fi

  cd "src/addons/$repo"
  STATUS=`git status -s`
  if [ ! -z "$STATUS" ]; then
    echo "$repo"
    echo "$STATUS"
  fi

  cd ../../../
done
