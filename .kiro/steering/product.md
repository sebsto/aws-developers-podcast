# Product

This repository is the source for the **AWS Developers Podcast** website, published at
https://developers.podcast.go-aws.com/web/index.html

It is a static website that presents podcast episodes: a home page listing episodes with
paginated browsing, per-episode detail pages, an in-page audio player, an RSS feed, and a
sitemap. Content is authored as Markdown episode files and rendered into a static site.

## Audience
Cloud developers of all skill levels looking for AWS news, tools, best practices, and
guest interviews.

## Key characteristics
- Content-first: new episodes are published by adding Markdown content, without touching the site's source code.
- Two-phase build: front-end assets are compiled with Webpack/SASS, then the Toucan static site generator assembles the final site from content + theme templates.
- Deployment is automated: a `git commit && git push` triggers the AWS build-and-deploy pipeline.
- Media assets (MP3 audio, episode images) are hosted separately in S3 and referenced by URL, not committed to this repo.
