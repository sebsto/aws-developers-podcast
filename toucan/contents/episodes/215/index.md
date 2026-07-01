---
title: "5 Lessons Running AI Agents in Production"
description: "John Sexton and Aaron Tummon from Genesys join the show to share hard-won lessons from building and operating Cloud Copilot — an agentic AI layer serving 2 million users across 21+ AWS regions. Genesys powers customer experience for brands like Virgin Atlantic, Vodafone, and HSBC, and their copilot helps admins, supervisors, and agents work more efficiently through natural language.
We cover the migration from Bedrock Inline Agents to Strands Agents, multi-agent orchestration with agents-as-tools, context management strategies, cost optimization, and the testing discipline required to keep agentic systems stable at scale.
The 5 lessons:
  1. Pick a framework that scales with you — Bedrock Inline Agents worked for 12–15 tools but became exponentially flakier beyond that. Strands Agents gave sensible defaults and room to grow without pinch points.
  2. Separate orchestration from domain logic — Agents-as-tools creates a clean line between the orchestrator and sub-agents. You can pull functionality in and out per persona without destabilizing the system, and domain teams own their sub-agents independently.
  3. Manage context aggressively — Long context windows for the orchestrator, stateless sub-agents, summarizing and sliding-window conversation managers, and strict control over what tools return. Every extra token in context degrades quality and increases cost.
  4. Make prompt caching non-negotiable — System prompts, tool definitions, and conversation history rarely change between invocations. Enabling prompt caching delivered significant cost reductions with almost no effort.
  5. Test relentlessly because prompt drift is invisible — One prompt change is never a breaking change; five accumulated changes are. A dedicated weekly Sentinel role investigates failures, and full test suites run on every single change."
guests:
  - name: "Aaron Tummon"
    link: https://www.linkedin.com/in/aaron-tummon/
    bio: "Software engineer at Genesys in Galway, Ireland, working on Cloud Copilot. Nine years in software development spanning Java SIP servers, embedded systems, automotive, and now agentic AI. Passionate about Strands Agents, context management, and systems-level programming."
    title: "Software Engineer at Genesys"
  - name: "John Sexton"
    link: https://www.linkedin.com/in/johnpatricksexton/
    bio: "Engineering Manager at Genesys leading the Cloud Copilot team. Four years at Genesys, transitioning from software development to machine learning and now managing the agentic AI effort. Focused on multi-agent orchestration, testing frameworks, and scaling AI across 21+ regions."
    title: "Engineering Manager at Genesys"
episode: 215
duration: "00:56:01"
size: 0
file: 215.mp3
social-background: 215.png
publication: 2026-07-01 09:00:00 +0200
author: "Romain Jourdan"
category: podcasts
aws-categories:
  - "Machine Learning & AI"
  - "Developer Tools"
links:
  - text: "Genesys Cloud — Customer Experience Platform"
    link: https://www.genesys.com/genesys-cloud
  - text: "Strands Agents SDK — Open-Source AI Agent Framework"
    link: https://github.com/strands-agents/sdk-python
  - text: "Strands Agents — Agent Evaluation SDK"
    link: https://github.com/strands-agents/agent-evaluation
  - text: "Amazon Bedrock — Prompt Caching"
    link: https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-caching.html
  - text: "AWS Lambda — Serverless Compute"
    link: https://aws.amazon.com/lambda/
  - text: "Aaron Tummon on LinkedIn"
    link: https://www.linkedin.com/in/aaron-tummon/
  - text: "John Sexton on LinkedIn"
    link: https://www.linkedin.com/in/johnpatricksexton/
  - text: "Thinking, Fast and Slow — Daniel Kahneman (Aaron's Book Pick)"
    link: https://www.amazon.com/Thinking-Fast-Slow-Daniel-Kahneman/dp/0374533555
  - text: "Mythos — Stephen Fry (John's Book Pick)"
    link: https://www.amazon.com/Mythos-Retelling-Myths-Ancient-Greece/dp/1452178917
---


