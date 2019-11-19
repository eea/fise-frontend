#!/usr/bin/env python

import argparse
import json
import os
import sys


def activate(target):

    if os.path.exists('jsconfig.json'):
        with open('jsconfig.json') as f:
            t = f.read()
    else:
        t = '{}'

    try:
        o = json.loads(t)
    except:
        print("Error in loading jsconfig.json file")
        sys.exit(137)

    if 'compilerOptions' not in o:
        o['compilerOptions'] = {
            "paths": {
                target: ["addons/{}/src".format(target)]
            },
            "baseUrl": "src"
        }
    else:
        paths = o['compilerOptions'].get('paths', {})
        paths[target] = ["addons/{}/src".format(target)]
        o['compilerOptions']['paths'] = paths

    with open('jsconfig.json', 'w') as f:
        f.write(json.dumps(o, indent=4, sort_keys=True))

    if os.path.exists('.eslintrc'):
        with open('.eslintrc') as f:
            t = f.read()
        try:
            j = json.loads(t)
        except:
            print("Error in loading .eslintrc file")
            sys.exit(137)
    else:
        j = {
            "extends": "./node_modules/@plone/volto/.eslintrc",
            "settings": {
                "import/resolver": {
                    "alias": {
                        "map": [
                            ["@plone/volto", "@plone/volto/src"],
                            ["@package", "./src"],
                            ["~", "./src"],
                        ], }}}}

    fmap = j['settings']['import/resolver']['alias']['map']
    fmap = [x for x in fmap if x[0] != target]
    fmap.append([target, "./src/addons/{}/src".format(target)])
    j['settings']['import/resolver']['alias']['map'] = fmap

    with open('.eslintrc', 'w') as f:
        f.write(json.dumps(j, indent=4, sort_keys=True))

    print("Activated package: {}".format(target))


def deactivate(target):
    if not os.path.exists('jsconfig.json'):
        pass
    else:
        with open('jsconfig.json') as f:
            t = f.read()

        try:
            j = json.loads(t)
        except:
            print("Error in loading jsconfig.json file")
            sys.exit(137)

        if target in j \
                .get('compilerOptions', {}) \
                .get('paths', {}):
            del j['compilerOptions']['paths'][target]

            with open('jsconfig.json', 'w') as f:
                f.write(json.dumps(j, sort_keys=True, indent=4))

    if not os.path.exists('.eslintrc'):
        return

    with open('.eslintrc') as f:
        t = f.read()

    try:
        j = json.loads(t)
    except:
        print("Error in loading .eslintrc file")
        sys.exit(137)

    fmap = j['settings']['import/resolver']['alias']['map']
    fmap = [x for x in fmap if x[0] != target]
    j['settings']['import/resolver']['alias']['map'] = fmap

    with open('.eslintrc', 'w') as f:
        f.write(json.dumps(j, indent=4, sort_keys=True))

    print("Deactivated package: {}".format(target))


def main(op, target):
    if op == 'activate':
        activate(target)

    if op == 'deactivate':
        deactivate(target)


if __name__ == "__main__":
    parser = argparse.ArgumentParser('Volto development helper')
    parser.add_argument('op', type=str, choices=['activate', 'deactivate'])
    parser.add_argument('target', type=str)
    args = parser.parse_args()
    main(args.op, args.target)
