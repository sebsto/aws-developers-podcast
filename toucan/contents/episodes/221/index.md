---
title: "Kiro, Strands Agents & MCP: 10 Updates You Missed"
description: "The MCP specification just went stateless. Clare Liguori — Senior Principal Engineer at AWS and core MCP maintainer — explains what changed, why it matters, and what it unlocks for agent developers building with Strands Agents and Kiro.
In this episode, Romain sits down with Clare Liguori, Senior Principal Engineer at AWS, to discuss the July 28 MCP spec release, new MCP extensions (Skills, Tasks, Events), Strands Agents Harness SDK, Strands Shell, Physical AI in Strands Labs, and the latest Kiro updates across Web, CLI, IDE 1.0, and iOS.
Key takeaways:
  • MCP goes stateless — the July 28 spec release removes the need for stateful streaming in remote MCP servers, so SaaS providers can drop sticky sessions and load-balancer gymnastics and run each request anywhere. Expect a new wave of remote MCP servers over HTTP.
  • New MCP extensions framework — features now start as stable extensions before graduating into the official spec: Skills over MCP (bundle a workflow and its tools together), long-running Tasks (kick off builds or jobs without blocking the agent), and Events (trigger always-on agents from external signals like Slack or an earthquake feed).
  • Strands Agents Harness SDK & TypeScript 1.0 — a more batteries-included harness with context management, compaction, and excellent out-of-the-box file tools, plus the TypeScript SDK reaching 1.0. Upgrade the model ID and your agent gets better.
  • Strands Shell — a lightweight, in-process agent sandbox written in Rust (cross-platform, Python SDK today). It gives an agent a virtual file system and minimal bash/Lua scripting without a heavyweight VM — great as a safe scratch pad or for scripting tools together.
  • Strands Labs & Physical AI — an experimental space for bleeding-edge agent ideas, including combining low-latency local VLA models on robots with the long-range, multi-task reasoning of frontier models in the cloud.
  • AgentCore Managed Harness — a configuration-based way to run agents (prompt, model, Lambda tools, context and session management) that is Strands under the hood, no Python or TypeScript required. AgentCore Gateway added MCP 2026-07-28 support day one, with version negotiation for backward compatibility.
  • One unified Kiro harness — Kiro Web, iOS, CLI, and IDE 1.0 now share one harness, bringing spec-driven development, hooks, skills, and powers to every client and letting new features ship across clients on the same day.
  • Automated reasoning in specs — property-based testing plus ambiguity and conflict detection in requirements help you express intent clearly; the permission system is built on Cedar with policy presets like dev shell, trust all, and read all.
  • Right-sizing specs and collaborating — check specs into code as a snapshot of intent, watch design and task-list length as a signal to split into multiple specs, add per-task validation steps, and collaborate on specs with comments in Kiro Web."
guests:
  - name: "Clare Liguori"
    link: https://www.linkedin.com/in/clareliguori/
    bio: "Senior Principal Engineer at AWS working on agentic AI developer tooling, including Kiro and the Strands Agents SDK. She is a core maintainer of the Model Context Protocol (MCP) specification."
    title: "Senior Principal Engineer at AWS"
episode: 221
duration: "01:02:42"
size: 0
file: 221.mp3
social-background: 221.png
publication: 2026-09-02 09:00:00 +0200
author: "Romain Jourdan"
category: podcasts
aws-categories:
  - "Machine Learning & AI"
  - "Developer Tools"
  - "DevOps"
links:
  - text: "MCP Specification (2026-07-28)"
    link: https://modelcontextprotocol.io/specification/2026-07-28/changelog
  - text: "Strands Agents SDK on GitHub"
    link: https://github.com/strands-agents
  - text: "Strands Agents Harness SDK"
    link: https://github.com/strands-agents/harness-sdk
  - text: "Strands Shell"
    link: https://github.com/strands-agents/shell
  - text: "Strands Agents TypeScript SDK"
    link: https://github.com/strands-agents/sdk-typescript
  - text: "Kiro — AI-Powered Development Environment"
    link: https://kiro.dev
  - text: "Amazon Bedrock AgentCore Gateway"
    link: https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/gateway.html
  - text: "How AgentCore Gateway supports the MCP 2026-07-28 spec"
    link: https://aws.amazon.com/blogs/machine-learning/how-agentcore-gateway-supports-the-mcp-2026-07-28-spec/
  - text: "Lean language"
    link: https://lean-lang.org
  - text: "Cedar — Permission Language"
    link: https://www.cedarpolicy.com
  - text: "Custodians of Wonder — Eliot Stein (Clare's Book Recommendation)"
    link: https://www.amazon.com/Custodians-Wonder-Ancient-Profound-Traditions/dp/1250281091
  - text: "Clare Liguori on LinkedIn"
    link: https://www.linkedin.com/in/clareliguori/
---

