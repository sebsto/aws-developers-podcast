#!/bin/bash 

# to be run from the main site directory (not from the docker directory)
# ./docker/run.sh

# image from https://github.com/envygeeks/jekyll-docker

export JEKYLL_VERSION=3.8
# export JEKYLL_VERSION=4.0
docker run \
  -p 4000:4000 \
  --rm \
  --volume="$PWD:/srv/jekyll" \
  --volume="$PWD/vendor/bundle:/usr/local/bundle" \
  -it jekyll/jekyll:$JEKYLL_VERSION \
  jekyll serve -H 0.0.0.0 -P 4000 
#   jekyll build --watch 