---
title: "CI/CD for coding agents: when validation becomes the bottleneck"
description: "Coding agents write code faster than ever, and the bottleneck in shipping software has moved to validating it. A 15-minute build gives an agent 4 feedback cycles an hour. A 5-minute build gives it 12.

Romain sits down with Dan Manges, co-founder and CEO of RWX and former CTO of Braintree and Root, to talk about what CI/CD looks like when agents are the main users, and how the rest of the software development lifecycle has to change with it.

Key topics covered:
  - Why traditional CI/CD pipelines slow down coding agents
  - Graph-based execution and content-based caching, compared to Docker's lineage-based caching
  - A CLI-first workflow: run CI against local changes without committing or pushing, and get a green PR check right away if the agent already ran it
  - Sandboxes for the agent's inner loop, MCP, semantic outputs, and retrying only the failed tests
  - Building RWX on AWS: a distributed container runtime with no image build and push, a hot pool of EC2 M8a instances, single-tenant VMs, and self-hosted runners in customer VPCs
  - Rethinking the SDLC from first principles: give agents the context to get it right, throw code away and fix AGENTS.md instead of iterating
  - Software factories for internal tools versus human review for mission-critical code
  - Turning large changes into reviewable work by building the whole change first, then extracting shippable pieces
  - Guardrails for agent-driven changes: CloudWatch, gradual rollouts and feature flags
  - Results: pipelines about 2x faster on average, and about 35% lower cost
  - Is infrastructure as code still necessary?

Chapters:
00:00 Rethinking engineering for AI agents
00:52 Meet Dan Manges and his engineering journey
02:59 Why traditional CI/CD becomes a bottleneck
05:34 Faster feedback loops for coding agents
08:02 Graph execution and content-based caching
13:19 A CLI-first, agent-native CI workflow
15:33 Unifying agent development and CI environments
17:45 Building RWX on AWS
21:33 Rethinking the SDLC for agents
24:33 When humans should review agent code
27:07 Giving agents the context to get it right
29:29 Sharing agent skills and team practices
35:50 Building software factories with agents
40:32 Turning large changes into reviewable work
46:20 Guardrails for safe agent-driven changes
48:06 Measuring CI speed, cost, and agent benefits
51:10 Signals your CI pipeline needs rethinking
54:02 Is infrastructure as code still necessary?
56:38 Closing thoughts and recommendations"
guests:
  - name: "Dan Manges"
    link: https://www.rwx.com/about
    bio: "Dan Manges is the co-founder and CEO of RWX. He was previously CTO of Braintree, acquired by PayPal, and co-founder and CTO of Root, which went public in 2020."
    title: "Co-founder and CEO of RWX"
episode: 227
duration: "01:02:36"
size: 0
file: 227.mp3
social-background: 227.png
publication: 2026-11-04 09:00:00 +0100
author: "Romain Jourdan"
category: podcasts
aws-categories:
  - "Developer Tools"
  - "Machine Learning & AI"
  - "Compute"
  - "Management & Governance"
links:
  - text: "RWX"
    link: https://www.rwx.com
  - text: "RWX documentation"
    link: https://www.rwx.com/docs
  - text: "RWX on AWS Marketplace"
    link: https://aws.amazon.com/marketplace/pp/prodview-rotvzkipwwkqm
  - text: "Work in progress commits are a thing of the past (RWX blog)"
    link: https://www.rwx.com/blog/work-in-progress-commits-are-a-thing-of-the-past
  - text: "Amazon EC2 M8a instances"
    link: https://aws.amazon.com/ec2/instance-types/m8a/
  - text: "Amazon CloudWatch"
    link: https://aws.amazon.com/cloudwatch/
  - text: "Bazel"
    link: https://bazel.build
  - text: "Nix"
    link: https://nixos.org
  - text: "Amp"
    link: https://ampcode.com
  - text: "Sapiens: A Brief History of Humankind, Yuval Noah Harari"
    link: https://www.ynharari.com/book/sapiens-2/
---
