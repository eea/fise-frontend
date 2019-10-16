all: clean build

clean:
	rm -rf build/

build:
	DEBUG= NODE_OPTIONS=--max_old_space_size=4096 RAZZLE_API_PATH=VOLTO_API_PATH RAZZLE_INTERNAL_API_PATH=VOLTO_INTERNAL_API_PATH yarn build

start:
	npm run start:prod

analyze:
	DEBUG= BUNDLE_ANALYZE=true NODE_OPTIONS=--max_old_space_size=4096 RAZZLE_API_PATH=VOLTO_API_PATH RAZZLE_INTERNAL_API_PATH=VOLTO_INTERNAL_API_PATH yarn build
