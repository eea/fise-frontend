#!/bin/bash
for repo in $(ls src/addons); do
    if [ -d "src/addons/$repo/.husky" ]; then
        cd "src/addons/$repo"
        printf "$repo - "
        yarn husky install
        cd ../../../
    fi
done
