# Project Structure

## Top-level layout
```
.
├── src/                     # Front-end source (compiled by Webpack)
├── build/                   # Webpack output (generated, gitignored)
├── toucan/                  # Toucan static site generator input
├── dist/                    # Final generated site (generated, gitignored)
├── cdk/                     # AWS CDK infrastructure (build/deploy pipeline)
├── content_migration_scripts/  # Python/shell utilities for content & media
├── helpers/                 # Custom Webpack plugins
├── webpack.config.js        # Webpack configuration
├── Makefile                 # Toucan build/serve/deploy targets
├── amplify.yml / buildspec.yaml  # CI build definitions
└── .nvmrc                   # Node version pin
```

## `src/` — front-end source
- `index.html`, `detail.html` — source HTML pages (mirror changes into Mustache templates)
- `js/` — vanilla JS: `main.js` (entry), `audioPlayer.js`, `themeToggle.js`
- `sass/` — styles, entry is `main.scss`, split into:
  - `custom/` — project component partials (`_hero`, `_header`, `_footer`, `_audio-player`, `_episodes`, `_link-card`, `_section-text`, `_general`, `_custom`)
  - `theme/` — Bootstrap theme + dark-mode overrides (`_theme`, `_theme-dark`, `_mixins-override`, `_utilities-override`)
- `img/`, `font/`, `audio/` — static assets

## `toucan/` — content & theme
- `config.yaml` — Toucan config (theme selection, RSS output)
- `contents/`
  - `index.yaml` — site-wide variables under the `site` namespace (title, footer links, tune-in URLs, RSS metadata, media/image base URLs)
  - `episodes/<N>/index.md` — one folder per episode; Markdown with YAML front matter
  - `home/` — home page content
- `themes/aws_podcasts/`
  - `assets/` — receives copied Webpack output (`css/`, `js/`, `fonts/`, `images/`)
  - `templates/`
    - `html.mustache`, `rss.mustache`, `sitemap.mustache` — top-level templates
    - `pages/` — `home`, `detail`, `episode_pagination`
    - `partials/` — reusable fragments (`header`, `footer`, `head`, `audioplayer`, `pagination`) plus `home/` and `detail/` subfolders
  - `types/podcast.yaml` — defines the `podcast` content type: location `episodes`, detail template, pagination (10/page, sorted by `publication` desc)

## Episode content convention
Each episode lives at `toucan/contents/episodes/<number>/index.md` with YAML front matter including:
`title`, `description`, `guests` (name/link/title), `episode`, `duration`, `size`, `file` (e.g. `194.mp3`), `social-background` (e.g. `194.png`), `publication` (date), `author`, `category`, `aws-categories`, and `links` (text/link pairs).
Audio and image files are referenced by name and served from S3 (see `medialink`/`imagelink` in `index.yaml`), not stored in the repo.

## `cdk/pipeline/` — infrastructure
- `lib/PipelineStack.ts`, `lib/WAFStack.ts` — pipeline and WAF stacks
- `docker/` — custom CodeBuild container image
- `bin/`, `test/`, standard CDK TypeScript project layout

## Conventions
- Content-only edits stay under `toucan/`; CI detects this to skip the front-end build.
- Generated directories (`build/`, `dist/`, `node_modules/`) are not committed.
- Keep source HTML (`src/*.html`) and Mustache templates in sync manually.
