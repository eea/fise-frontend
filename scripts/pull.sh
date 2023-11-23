#!/bin/bash

for repo in $(ls src/addons); do
  if [ ! -d "src/addons/$repo" ]; then
    continue
  fi

  cd "src/addons/$repo"
  STATUS=`git status -s`
  echo "============= $repo =========="
  if [ -z "$STATUS" ]; then
    git checkout develop
    git pull
  else
    echo "$STATUS"
  fi

  cd ../../../
done
