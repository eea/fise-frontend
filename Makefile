##############################################################################
# Run:
#    make
#    make start
#
# Go to:
#
#     http://localhost:3000
#
##############################################################################
# SETUP MAKE
#
## Defensive settings for make: https://tech.davis-hansson.com/p/make/
SHELL:=bash
.ONESHELL:
# for Makefile debugging purposes add -x to the .SHELLFLAGS
.SHELLFLAGS:=-eu -o pipefail -O inherit_errexit -c
.SILENT:
.DELETE_ON_ERROR:
MAKEFLAGS+=--warn-undefined-variables
MAKEFLAGS+=--no-builtin-rules

# Colors
# OK=Green, warn=yellow, error=red
ifeq ($(TERM),)
# no colors if not in terminal
	MARK_COLOR=
	OK_COLOR=
	WARN_COLOR=
	ERROR_COLOR=
	NO_COLOR=
else
	MARK_COLOR=`tput setaf 6`
	OK_COLOR=`tput setaf 2`
	WARN_COLOR=`tput setaf 3`
	ERROR_COLOR=`tput setaf 1`
	NO_COLOR=`tput sgr0`
endif

##############################################################################

# Top-level targets
.PHONY: all
all: develop install

.PHONY: develop
develop: ## Runs missdev in the local project (mrs.developer.json should be present)
	npx -p mrs-developer missdev --config=jsconfig.json --output=addons --fetch-https

.PHONY: install
install:	## Frontend: Install project and add-ons
	yarn install

.PHONY: start
start:		## Frontend: Start
	yarn start

.PHONY: omelette
omelette: ## Creates the omelette folder that contains a link to the installed version of Volto (a softlink pointing to node_modules/@plone/volto)
	if [ ! -d omelette ]; then ln -sf node_modules/@plone/volto omelette; fi

.PHONY: patches
patches:
	/bin/bash patches/patchit.sh > /dev/null 2>&1 ||true

.PHONY: release
release: ## Show release candidates
	./scripts/release.py

.PHONY: update
update: ## git pull all src/addons
	./scripts/update.sh

.PHONY: issues
issues: ## Check github for open pull-requests
	./scripts/pull-requests.py WARN

.PHONY: issues-all
issues-all: ## Check github for open pull-requests
	./scripts/pull-requests-volto.py WARN

.PHONY: status
status: ## Check src/addons for changes
	./scripts/status.sh

.PHONY: pull
pull: ## Run git pull on all src/addons
	./scripts/pull.sh

.PHONY: help
help:		## Show this help.
	@echo -e "$$(grep -hE '^\S+:.*##' $(MAKEFILE_LIST) | sed -e 's/:.*##\s*/:/' -e 's/^\(.\+\):\(.*\)/\\x1b[36m\1\\x1b[m:\2/' | column -c2 -t -s :)"
	head -n 10 Makefile
