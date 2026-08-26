# Tech Stack

## Build pipeline (two phases)
1. **Phase 1 — Front-end assets (Webpack + SASS):** compiles JS, SASS, and static assets from `src/` into `build/`, then copies them into the Toucan theme's `assets/` directory.
2. **Phase 2 — Static site (Toucan):** the [Toucan](https://github.com/toucansites/toucan) static site generator assembles the final site into `dist/` from Markdown content (`toucan/contents/`) and Mustache theme templates (`toucan/themes/aws_podcasts/`).

## Languages & tooling
- **Node.js** `23.3.0` (see `.nvmrc`)
- **Webpack 5** with Babel (`@babel/preset-env`) for JS bundling
- **SASS** (`sass`, `sass-loader`) compiled via `mini-css-extract-plugin`; PostCSS with `autoprefixer`, `postcss-preset-env`, and `postcss-sort-media-queries`
- **Bootstrap 5.3** as the CSS framework, plus `@popperjs/core` and `svgxuse`
- Vanilla JS (no framework) for interactivity: audio player, theme toggle, main
- **Toucan** — a Swift-based static site generator (requires a Swift compiler; installed separately via `sudo make install`)
- **Mustache** templates for site markup

## Infrastructure & deployment
- **AWS CDK** (TypeScript) defines the build/deploy pipeline in `cdk/pipeline/lib/` (`PipelineStack.ts`, `WAFStack.ts`)
- **AWS CodeBuild** (`buildspec.yaml`) and **AWS Amplify** (`amplify.yml`) drive builds; both detect content-only changes (paths under `toucan/`) to run a minimal build
- Pushing to git triggers the pipeline and deploys the site

## Common commands

### Front-end (Webpack)
```sh
npm i              # install dependencies
npm start          # webpack --watch + live BrowserSync server (localhost:3000)
npm run build      # build assets into ./build
npm run copy       # copy built assets into the Toucan theme assets dir
```

### Site generation (Toucan via Makefile)
```sh
make dev           # full build + generate local site (base-url 127.0.0.1:8888)
make serve         # serve ./dist at http://127.0.0.1:8888
make watch         # regenerate on content changes
make prod          # production build with the live base-url
make clean         # remove ./dist
make dev && make serve   # common local preview workflow
```

### npm site scripts (used by CI)
```sh
npm run dist       # toucan generate with production base-url
npm run preview    # toucan generate with preview base-url
```

### Local CI / pipeline
```sh
make codebuild     # build custom container and run CodeBuild locally
cdk --profile <profile> deploy   # deploy the pipeline (run in cdk/pipeline)
```

## Important conventions
- `src/index.html` and `src/detail.html` are the source HTML. **Any change to these must be manually reflected in the corresponding `.mustache` templates** under `toucan/themes/aws_podcasts/templates/`. Toucan does not read the HTML files directly.
- Assets are emitted by Webpack into typed subfolders (`js/`, `css/`, `fonts/`, `images/`, `audio/`) — see `webpack.config.js` `generator.filename` rules.
- Images use `data-src`/`data-srcset` (lazy loading); SVG sprites use `xlink:href`. The custom `helpers/remove-attribute-plugin.js` post-processes HTML output.
