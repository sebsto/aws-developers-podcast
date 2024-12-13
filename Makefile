SHELL=/bin/sh

# brew install optipng jpegoptim

dev:
	toucan generate ./toucan ./dist --base-url http://127.0.0.1:3000

dist:
	toucan generate ./toucan ./dist

watch:
	toucan watch ./toucan ./dist --base-url http://127.0.0.1:3000

serve:
	toucan serve ./dist -p 3000

png:
	find ./toucan/* -type f -name '*.png' -exec optipng -o7 {} \;

jpg:
	find ./toucan/* -type f -name '*.jpg' | xargs jpegoptim --all-progressive '*.jpg'
