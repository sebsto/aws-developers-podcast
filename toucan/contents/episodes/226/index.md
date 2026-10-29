---
title: "Agent harness: the 5 pieces your AI agent is missing"
description: "An agent harness is everything around the model that turns it into a working AI agent, and most agents are missing key pieces of it. In this episode we go through five of them: context management, sandboxing, fine-grained policies, fast decision models, and a harness you can run in production.

Romain sits down with Morgan Willis, Senior Developer Advocate at AWS, and Arron Bailiss, Principal Engineer and Tech Lead for Strands Agents, to look at what it takes to build a state-of-the-art agentic system today, and how Strands Agents grew from an agent loop SDK into a full toolkit for it.

The 5 pieces:
  1. A harness with built-in tools, memory and a CLI, open source as Strands harness or managed as AgentCore harness
  2. Context management that offloads tool results and compacts history, for 28% lower token cost on the same model
  3. A sandbox that limits what files and network your agent can reach (Strands Box)
  4. Policies that remember what the agent already did, so it can't issue a refund before checking eligibility (Dogwood)
  5. Small decision models that pick between options in milliseconds instead of a full LLM call (Strands Decider)

Plus: real-time voice agents with bidirectional streaming, and why Morgan turned a Big Mouth Billy Bass into one.

Chapters:
00:00 Strands one year after going open source
02:45 Why model-driven agents get better with every model
13:50 What is an agent harness? Model plus harness
18:20 Piece 1: a harness with tools, memory and a CLI
25:50 Piece 2: context management and 28% lower token cost
29:45 Piece 3: sandboxing agents with Strands Box
31:00 Piece 4: Dogwood policies that track what the agent did
42:45 Piece 5: Strands Decider and small decision models
51:15 Bonus: voice agents with bidirectional streaming
56:45 What's next: agent safety and self-improvement"
guests:
  - name: "Morgan Willis"
    link: https://www.linkedin.com/in/morganwilliscloud/
    bio: "Morgan Willis is a Senior Developer Advocate at AWS focused on agentic AI and Strands Agents."
    title: "Senior Developer Advocate at AWS"
  - name: "Arron Bailiss"
    link: https://www.linkedin.com/in/arronbailiss/
    bio: "Arron Bailiss is a Principal Engineer at AWS and Tech Lead for Strands Agents, working across agentic AI, machine learning and robotics."
    title: "Principal Engineer at AWS and Tech Lead for Strands Agents"
episode: 226
duration: "01:07:13"
size: 0
file: 226.mp3
social-background: 226.png
publication: 2026-10-28 09:00:00 +0100
author: "Romain Jourdan"
category: podcasts
aws-categories:
  - "Machine Learning & AI"
  - "Developer Tools"
  - "Security, Identity & Compliance"
links:
  - text: "Strands Agents"
    link: https://strandsagents.com
  - text: "Introducing Strands harness"
    link: https://strandsagents.com/blog/introducing-strands-harness/
  - text: "We ran 94,000 trials to measure the cost of harness choice"
    link: https://strandsagents.com/blog/we-ran-94000-trials-to-measure-the-cost-of-harness-choice/
  - text: "AgentCore harness"
    link: https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/runtime-get-started-toolkit.html
  - text: "Strands Box (GitHub)"
    link: https://github.com/strands-agents/box
  - text: "Strands Box: The Big Picture"
    link: https://strandsagents.com/blog/strands-box-the-big-picture/
  - text: "Strands Box and Dogwood docs"
    link: https://strandsagents.com/docs/user-guide/box/
  - text: "Introducing Strands Decider 2B"
    link: https://strandsagents.com/blog/introducing-strands-decider/
  - text: "Strands Decider (GitHub)"
    link: https://github.com/strands-labs/strands-decider
  - text: "Strands Evals"
    link: https://strandsagents.com/blog/framework-agnostic-evaluation-strands-evals/
  - text: "Bidi Agents now GA"
    link: https://strandsagents.com/blog/bidi-agents-now-ga/
  - text: "BillAI Bass, Morgan's talking fish"
    link: https://github.com/morganwilliscloud/billai-bass
  - text: "Kiro Crew"
    link: https://kiro.dev/crew/
  - text: "Marc Brooker's blog"
    link: https://brooker.co.za/blog/
  - text: "Site Reliability Engineering, 2nd Edition (Google)"
    link: https://sre.google/resources/book-update/
  - text: "Code: The Hidden Language of Computer Hardware and Software, Charles Petzold"
    link: https://www.microsoftpressstore.com/store/code-the-hidden-language-of-computer-hardware-and-software-9780137909100
  - text: "Morgan Willis on LinkedIn"
    link: https://www.linkedin.com/in/morganwilliscloud/
  - text: "Arron Bailiss on LinkedIn"
    link: https://www.linkedin.com/in/arronbailiss/
---

