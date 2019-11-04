image-name-split = $(word $2,$(subst :, ,$1))

SHELL=/bin/bash
DOCKERIMAGE_FILE="docker-image.txt"
NAME := $(call image-name-split,$(shell cat $(DOCKERIMAGE_FILE)), 1)
IMAGE := $(shell cat $(DOCKERIMAGE_FILE))

.DEFAULT_GOAL := help

.PHONY: all
all: clean build		## (Inside container) build a production version of resources

.PHONY: clean
clean:
	rm -rf build/

.PHONY: build
build:
	DEBUG= \
				 NODE_OPTIONS=--max_old_space_size=4096 \
				 RAZZLE_API_PATH=VOLTO_API_PATH \
				 RAZZLE_INTERNAL_API_PATH=VOLTO_INTERNAL_API_PATH \
				 yarn build;	\
	./entrypoint-prod.sh

.PHONY: start
start:		## (Inside container) starts production mode frontend server
	npm run start:prod

.PHONY: analyze
analyze:		## (Inside container) build production resources and start bundle analyzer HTTP server
	DEBUG= \
				 BUNDLE_ANALYZE=true \
				 NODE_OPTIONS=--max_old_space_size=4096 \
				 RAZZLE_API_PATH=VOLTO_API_PATH \
				 RAZZLE_INTERNAL_API_PATH=VOLTO_INTERNAL_API_PATH \
				 yarn build

.PHONY: image
image: bump build-image push		## (Host side) release a new version of frontend docker image

.PHONY: bump
bump:
	echo "Bumping version...";
	python ./../scripts/version_bump.py $(DOCKERIMAGE_FILE);

.PHONY: build-image
build-image:
	@echo "Building new docker image: $(IMAGE)";
	docker build . -t "$(IMAGE)";
	@echo "Image built."

.PHONY: push
push:
	docker push $(IMAGE)
	docker tag $(IMAGE) $(NAME):latest
	docker push $(NAME):latest

.PHONY: help
help:		## Show this help.
	@echo -e "$$(grep -hE '^\S+:.*##' $(MAKEFILE_LIST) | sed -e 's/:.*##\s*/:/' -e 's/^\(.\+\):\(.*\)/\\x1b[36m\1\\x1b[m:\2/' | column -c2 -t -s :)"
