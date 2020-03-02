## Forest: Volto Frontend

[![Pipeline](https://ci.eionet.europa.eu/buildStatus/icon?job=forests%2Fforests-frontend%2Fmaster&subject=pipeline)](https://ci.eionet.europa.eu/view/Github/job/forests/job/forests-frontend/job/master/display/redirect)
[![GitHub release (latest SemVer)](https://img.shields.io/github/v/release/eea/forests-frontend?sort=semver)](https://github.com/eea/forests-frontend/releases)


Below is a list of commands you will probably find useful.

### `yarn start`

Runs the project in development mode.
You can view your application at `http://localhost:3000`

The page will reload if you make edits.

### `yarn build`

Builds the app for production to the build folder.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

### `yarn start:prod`

Runs the compiled app in production.

You can again view your application at `http://localhost:3000`

### `yarn test`

Runs the test watcher (Jest) in an interactive mode.
By default, runs tests related to files changed since the last commit.

### `yarn i18n`

Runs the test i18n runner which extracts all the translation strings and
generates the needed files.


### mr_developer

[mr_developer](https://www.npmjs.com/package/mr-developer) is a great tool
for developing multiple packages at the same time.

mr_developer should work with this project by using the `--config` config option:

```bash
mrdeveloper --config=jsconfig.json
```

Volto's latest razzle config will pay attention to your jsconfig.json file
for any customizations.


## Production

We use [Docker](https://www.docker.com/), [Rancher](https://rancher.com/) and [Jenkins](https://jenkins.io/) to deploy this application in production.

### Deploy

* Within `Rancher > Catalog > EEA` deploy [Volto - Forests](https://github.com/eea/eea.rancher.catalog/tree/master/templates/volto-forests)

### Release

* Create a new release of this code via `git tag` command or [Draft new release](https://github.com/eea/forests-frontend/releases/new) on Github.
  * A new Docker image is built and released automatically on [DockerHub](https://hub.docker.com/r/eeacms/forests-frontend) based on this tag.
  * A new entry is automatically added to [Volto - Forests](https://github.com/eea/eea.rancher.catalog/tree/master/templates/volto-forests) `EEA Rancher Catalog`

### Upgrade

* Within your Rancher environment click on the `Upgrade available` yellow button next to your stack.

* Confirm the upgrade

* Or roll-back if something went wrong and abort the upgrade procedure.
