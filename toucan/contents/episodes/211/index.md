---
title: "Why Your Agent Evaluations Will Fail You (and How to Fix Them Before Production)"
description: "Anthropic deprecated Sonnet 3.5. Some of Xelix's pipelines migrated smoothly. Others broke — and customers noticed within hours. What separated the two? Evaluation.
Paul Solomon and James Price Farr have spent 5+ years building AI systems that process millions of invoices for enterprise customers. In this episode, they share the evaluation-first framework that now saves them every time a model changes, an orchestration layer fails, or an agent picks the wrong tool.
Key takeaways:
  • Evaluation-first, not evaluation-after — Retrofitting evaluation on an agent already in production is painful. Build your eval pipeline before you build the agent.
  • Monitor tool calls, not just outputs — If the agent isn't selecting the right tools, nothing downstream will be correct. Tool-call monitoring is your leading indicator.
  • 3 tiers of automation — Not everything needs an agent. Rules-based → single LLM call → agentic system. Pick the simplest tier that solves the problem.
  • Extended thinking tames token explosion — After migrating to newer, more verbose models, enabling extended thinking (with a budget) moved reasoning out of expensive output tokens and brought costs back under control.
  • Human-in-the-loop by default — Start with human review on every output, then earn trust toward touchless automation as customers gain confidence.
  • Pragmatism wins — Use whatever technology works best for the problem. Not every feature needs an LLM.
Recorded live at AWS Summit London."
guests:
  - name: "Paul Solomon"
    link: https://www.linkedin.com/in/paul-solomon/
    bio: "Head of AI Engineering at Xelix. Leads the team responsible for all AI, machine learning, and algorithmic systems on the Xelix platform — from building and monitoring to improving production systems that process millions of invoices for enterprise customers."
    title: "Head of AI Engineering at Xelix"
  - name: "James Price Farr"
    link: https://www.linkedin.com/in/jamespricefarr/
    bio: "AI Engineering Team Lead at Xelix with 5+ years at the company. Works on building and scaling AI systems for enterprise accounts payable, from traditional ML models to agentic systems powered by Strands Agents and Amazon Bedrock."
    title: "AI Engineering Team Lead at Xelix"
episode: 211
duration: "00:44:06"
size: 0
file: 211.mp3
social-background: 211.png
publication: 2026-06-03 09:00:00 +0200
author: "Romain Jourdan"
category: podcasts
aws-categories:
  - "Machine Learning & AI"
  - "Developer Tools"
links:
  - text: "Xelix — AI-Powered Accounts Payable Platform"
    link: https://xelix.com/
  - text: "Strands Agents SDK — Open Source"
    link: https://github.com/strands-agents/sdk-python
  - text: "Amazon Bedrock — Managed LLM Inference"
    link: https://aws.amazon.com/bedrock/
  - text: "Amazon Bedrock AgentCore"
    link: https://aws.amazon.com/bedrock/agentcore/
  - text: "Strands Agents — Steering Files and Hooks for Agent Accuracy (Claire Liguori)"
    link: https://strandsagents.com/latest/blog/
  - text: "Amazon SageMaker"
    link: https://aws.amazon.com/sagemaker/
  - text: "Fast.ai — Practical Deep Learning Courses (Book Recommendation)"
    link: https://www.fast.ai/
  - text: "The Fifth Risk — Michael Lewis (Book Recommendation)"
    link: https://www.amazon.com/Fifth-Risk-Michael-Lewis/dp/1324002646
  - text: "Neurosymbolic AI and Automated Reasoning on AWS"
    link: https://aws.amazon.com/bedrock/agentcore/
  - text: "Kiro — AI-Powered Development Environment"
    link: https://kiro.dev/
---
