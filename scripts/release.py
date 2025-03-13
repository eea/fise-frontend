#!/bin/env python
""" Release candidates
"""
import os
import json
import subprocess
import argparse
import urllib.request

VOLTO = "https://raw.githubusercontent.com/plone/volto/16.x.x/package.json"
KITKAT = "https://raw.githubusercontent.com/eea/volto-eea-kitkat/develop/package.json"

def main(verbose, skip):
    """ Main
    """
    versions = {}
    kitkat = []
    to_be_release = []
    prod_volto = 'PROD'
    dev_volto = 'DEV'
    latest_volto = 'LATEST'

    # Get PROD
    with open("package.json", "r", encoding='utf-8') as ofile:
        config = json.load(ofile)
        dev_volto = config['dependencies']['@plone/volto']

        for package, version in config['dependencies'].items():
            if package == "@plone/volto":
                prod_volto = version
                continue

            tag = version.split("#")[-1]
            versions[package] = tag

    with urllib.request.urlopen(KITKAT) as ofile:
        config = json.load(ofile)

        for package, version in config['dependencies'].items():
            tag = version.split("#")[-1]
            versions[package] = tag
            kitkat.append(package)

    # Get LATEST
    with urllib.request.urlopen(VOLTO) as ofile:
        volto = json.load(ofile)
        latest_volto = volto['version']

    # Add-ons
    with open("jsconfig.json", "r", encoding='utf-8') as ofile:
        config = json.load(ofile)

        for addon, paths in config['compilerOptions']['paths'].items():
            path = paths[0]
            release = versions.get(addon)
            if not release:
                to_be_release.append(addon)
                continue

            with subprocess.Popen(
                ["git", "log", "--pretty=oneline", "--abbrev-commit", f"{release}..HEAD"],
                cwd=os.path.join(os.getcwd(), "src", path), stdout=subprocess.PIPE) as proc:
                res = proc.stdout.read()
                commits = []
                for commit in res.split(b'\n'):
                    if not commit.strip():
                        continue
                    skip_me = False
                    if skip:
                        for skip_c in skip:
                            if skip_c in str(commit.lower()):
                                skip_me = True
                                break
                    if skip_me:
                        continue
                    commits.append(commit)
                if commits:
                    if verbose:
                        print(f"==================== {path} ")
                        print(res.decode('utf-8'))
                    prefix = "KITKAT" if addon in kitkat else "FRONT"
                    to_be_release.append(f"{prefix}:\t {addon}: {release} ->")

    # Volto
    print("======== @plone/volto ")
    if dev_volto != latest_volto:
        print(f"DEV: \t @plone/volto: {dev_volto} -> {latest_volto}")
    if prod_volto != latest_volto:
        print(f"PROD:\t @plone/volto: {prod_volto} -> {latest_volto}")

    return to_be_release

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument('-v', '--verbose', help='Verbose', action='store_true')
    parser.add_argument('-s', '--skip',
        help='Skip commits: e.g.: -s sonarqube', action='append', default=[])
    args = parser.parse_args()
    RES = "\n".join(
        main(args.verbose, args.skip)
    )
    print(f"======== Add-ons to be released: \n{RES}")
