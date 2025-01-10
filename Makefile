SHELL=/bin/sh

# if you need image optimization, you can install optipng and jpegoptim
# brew install optipng jpegoptim

# directories
WEB_DIR=./src
DIST_DIR=./dist
TOUCAN_DIR=./toucan
BUILD_DIR=./build

# Define source files 
SRC_FILES = $(wildcard $(WEB_DIR)/**/*.*)
CONTENT_FILES = $(wildcard $(TOUCAN_DIR)/content/*.md)
THEME_FILES = $(wildcard $(TOUCAN_DIR)/themes/aws_podcasts/**/*.*)

# The dist target depends on the source files
$(DIST_DIR): $(SRC_FILES) $(CONTENT_FILES) $(THEME_FILES)
	npm install && npm run build && npm run copy
	toucan generate $(TOUCAN_DIR) $(DIST_DIR)

# Prod build depends on dist directory and adds base URL
prod: $(DIST_DIR)
	toucan generate $(TOUCAN_DIR) $(DIST_DIR) --base-url https://developers.podcast.go-aws.com/web

# Development build depends on dist directory and adds base URL
dev: $(DIST_DIR)
	toucan generate $(TOUCAN_DIR) $(DIST_DIR) --base-url http://127.0.0.1:3000

# Watch depends on dev build
watch: dev
	toucan watch $(TOUCAN_DIR) $(DIST_DIR) --base-url http://127.0.0.1:3000

# Serve depends on having the dist directory
serve: $(DIST_DIR)
	toucan serve $(DIST_DIR) -p 3000

# Image optimization targets
png: $(wildcard $(TOUCAN_DIR)/**/*.png)
	find $(TOUCAN_DIR)/* -type f -name '*.png' -exec optipng -o7 {} \;

jpg: $(wildcard $(TOUCAN_DIR)/**/*.jpg)
	find $(TOUCAN_DIR)/* -type f -name '*.jpg' | xargs jpegoptim --all-progressive '*.jpg'

# Clean target to remove generated files
clean:
	rm -rf $(DIST_DIR)

# Declare phony targets (targets that don't create files)
.PHONY: dev watch serve png jpg codebuild clean

codebuild:
	docker build cdk/docker -t adp:latest
	./codebuild_build.sh -i adp:latest -a .