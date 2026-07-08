---
title: "What are MCP apps and why should you care?"
description: "Most MCP tools today return text. But what if your agent could render a chart, a form, or a full dashboard right inside the chat? That's what MCP apps do — and they're already live on ChatGPT, Claude, and Amazon Quick.
Romain sits down with Luigi Pederzani, co-founder of Manufact (the company behind mcp-use, 10K+ GitHub stars), to explore MCP apps — the first official extension of the MCP protocol that lets servers return interactive UI inside AI chat interfaces.
Key takeaways:
  • What MCP apps are — Standard MCP returns text and actions; MCP apps let a server send back a piece of interface (a form, a chart, a dashboard) that renders right inside the chat. It became the first official extension of the protocol this year, growing out of MCP-UI.
  • UI drives retention — Amplitude saw 2x retention for users exposed to a chart-rendering MCP app versus text-only responses. UI lets software products stay experiences, not just systems of record.
  • AI apps are the new browsers — Extending Paul Graham's thesis, every software product will be rendered inside AI chats, pulling data and structure from different sources the way we switch tabs today.
  • Building with mcp-use — Reuse existing React components with minimal changes; the useMcp hook bridges tool arguments (filled by the agent) into component props. The server stays a normal MCP server, the client is the host, and the view runs in a sandboxed iframe.
  • Interactivity and safety — Iframes are battle-tested and the model-to-server communication is standardized. UI can send events back to the model, so clicking a chart element can trigger another tool call in the chat. OAuth is now standard for production MCP servers.
  • Tool design best practices — Don't wrap OpenAPI specs directly as MCP. APIs are granular and atomic; MCP tools should serve a task end-to-end so agents don't get confused on ordering. Limit the number of tools exposed; progressive disclosure is now handled by the major clients.
  • MCP as the A2A protocol — A2A never really landed, and MCP is becoming the agent-to-agent protocol, with companies embedding an agent as a single tool whose main argument is a prompt.
  • Getting to production — Start with a plain MCP server, then add UI. Skills are now part of the product, and Manufact focuses on agent-readiness of the SDK, testing across clients, deployment, auth, observability (OTEL), and per-tool analytics.
  • AWS integration — mcp-use can sit on the server side while AgentCore Gateway sits in front to handle enterprise concerns like auth policies and routing.
  • What's next — Exposing skills directly from MCP servers (rather than decoupled files), and the next stateless-by-default release of the protocol."
guests:
  - name: "Luigi Pederzani"
    link: https://www.linkedin.com/in/luigipederzani/
    bio: "Co-founder of Manufact, the company behind mcp-use — one of the most popular open-source MCP SDKs, with 10K+ GitHub stars. Manufact helps developers build, test, and deploy MCP servers and MCP apps in production. Passionate about the MCP protocol, agent-first software, and making SDKs ready for both developers and coding agents."
    title: "Co-founder of Manufact"
episode: 216
duration: "00:50:36"
size: 0
file: 216.mp3
social-background: 216.png
publication: 2026-07-08 09:00:00 +0200
author: "Romain Jourdan"
category: podcasts
aws-categories:
  - "Machine Learning & AI"
  - "Developer Tools"
links:
  - text: "mcp-use SDK (GitHub)"
    link: https://github.com/mcp-use/mcp-use
  - text: "Manufact Cloud"
    link: https://manufact.com/
  - text: "Ora.ai — Agent Readiness Scanner"
    link: https://ora.ai
  - text: "Amazon Bedrock AgentCore Gateway — MCP Server Targets"
    link: https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/gateway-target-MCPservers.html
  - text: "AgentMail — Email Infrastructure for Agents"
    link: https://www.agentmail.to
  - text: "Thinking, Fast and Slow — Daniel Kahneman (Luigi's Book Pick)"
    link: https://www.amazon.com/Thinking-Fast-Slow-Daniel-Kahneman/dp/0374533555
  - text: "Luigi Pederzani on LinkedIn"
    link: https://www.linkedin.com/in/luigipederzani/
---


