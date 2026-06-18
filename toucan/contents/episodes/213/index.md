---
title: "KiroGraph: How a Local Code Graph Saves 80% of Your AI Tokens"
description: "Davide de Sio built KiroGraph as a personal side project to stop his AI agent from burning through credits just searching files. It turned into a community-driven, open-source MCP server that gives Kiro (and other AI agents) a semantic map of your codebase — reducing token usage by up to 80%.
We dive into the architecture, security, and modules, how everything runs 100% locally, and how the AWS Community shaped the project's roadmap.
Key takeaways:
  • Code graphs vs. grep — Tree-sitter and AST-based graph generation give AI agents a smarter navigation model, eliminating wasteful file searches.
  • Architecture module — Detects patterns and prevents drift by validating your codebase against its own structural rules.
  • Security module — Finds exposed secrets and vulnerabilities by tracing the call graph, born from an AWS Summit Milano talk.
  • Watchman module — Auto-generates Kiro skills from repetitive patterns, building persistent memory for your agent.
  • 100% local execution — Embeddings run with Nomic and summarization with Gemma 3, no data leaves your machine.
  • Spec-driven development — Davide built KiroGraph with Kiro itself, using specs to drive the entire development lifecycle.
  • Portability — Commit the graph to Git and share it across machines and team members.
  • Community-driven roadmap — CI/CD integration, validation hooks, and container deployment are next."
guests:
  - name: "Davide de Sio"
    link: https://www.linkedin.com/in/davidedesio/
    bio: "Head of Software Engineering at Eleva, AWS Community Builder (Serverless), based near Milan, Italy. Built KiroGraph as an open-source MCP server that gives AI coding agents a semantic map of your codebase. Passionate about local-first tooling, spec-driven development, and reducing AI token waste through smarter code navigation."
    title: "Head of Software Engineering at Eleva"
episode: 213
duration: "01:06:42"
size: 0
file: 213.mp3
social-background: 213.png
publication: 2026-06-17 09:00:00 +0200
author: "Romain Jourdan"
category: podcasts
aws-categories:
  - "Machine Learning & AI"
  - "Developer Tools"
links:
  - text: "KiroGraph — Open-Source Code Knowledge Graph (GitHub)"
    link: https://github.com/davide-desio-eleva/kirograph
  - text: "Kiro IDE — AI-Powered Development Environment"
    link: https://kiro.dev/
  - text: "Tree-sitter — Incremental Parsing System"
    link: https://github.com/tree-sitter/tree-sitter
  - text: "Nomic Embed — Local Text Embeddings"
    link: https://huggingface.co/nomic-ai/nomic-embed-text-v1
  - text: "AWS Community Builders Program"
    link: https://aws.amazon.com/developer/community/community-builders/
  - text: "Davide's Blog — Building KiroGraph"
    link: https://devs.30tools.com/aws-builders/building-kirograph-a-100-local-semantic-code-knowledge-graph-for-kiro-2ja4
  - text: "KiroGraph-Sec — From AWS Summit Milano to a Cybersecurity Feature"
    link: https://devs.30tools.com/aws-builders/kirograph-sec-from-aws-summit-milano-slides-through-kiro-specs-to-a-cybersecurity-feature-12ch
---

