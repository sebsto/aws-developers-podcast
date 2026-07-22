---
title: "Your AI platform isn't mature — here's what is"
description: "I keep hearing 'we're building an AI platform' from enterprises. Most are stitching together demos. Thomson Reuters has been doing AI for 30 years. I sat down with Laura Skylaki (VP AI Engineering, Thomson Reuters) at AWS Summit London — and the gap between what they're doing vs. what most companies call 'AI maturity' is striking.
In this episode, Laura breaks down how Thomson Reuters built an enterprise AI platform that serves 30,000 employees across three user personas — from business users to AI creators to developers — with 16 internal services, a $200M/year AI commitment, and a healthy skepticism about when agentic is actually the right answer.
Key takeaways:
  • Evaluation before building — 'It's increasingly harder to retrofit an evaluation framework to an agent capability you already deployed.' They build evaluation benchmarks first to force understanding of the business problem, then build the agent. LLM-as-a-judge with human-in-the-loop calibration — and the judges themselves need continuous regression checks.
  • Know when NOT to use agents — 'Where we can go and write deterministic code with a logical rule-based approach, I don't think it makes sense to rely on the agent.' Not everything needs to be agentic. When tools exceed a dozen or overlap semantically, specialize into multiple agents instead of overloading one.
  • Engineers haven't written code manually in 3-4 months — Not experimenting; their AI coding tooling is that far ahead. The shift is toward system design, architecture, and clear structuring for AI assistance.
  • AWS under the hood with AgentCore and Strands — The platform runs on AWS with API Gateway, Lambda, Step Functions, and Amazon Bedrock AgentCore for agent deployments (runtime, memory, MCP marketplace, code interpreter, browser tools, policy and identity governance). They use Strands Agents SDK to build agents. AgentCore removes the infrastructure burden of long-running agent sessions.
  • Rethink workflows, don't retrofit — Teams reimagining legacy workflows from scratch for AI rather than bolting generative AI onto systems not built for it. 'If I was building this now for the first time, how would I build it?' The companies that succeed with AI are not fitting it into existing processes — they're redesigning the process through AI."
guests:
  - name: "Laura Skylaki"
    link: https://www.linkedin.com/in/lauraskylaki/
    bio: "VP of AI Engineering at Thomson Reuters, leading the Enterprise AI Platform (16 services, 60-person team) and the Co-Counsel Legal evaluation framework. Background in applied AI research — from bioinformatics and stem cell genomics to NLP and large language models. 30-year AI heritage at Thomson Reuters with one of the world's richest proprietary legal datasets. Based in Zug, Switzerland."
    title: "VP of AI Engineering at Thomson Reuters"
episode: 218
duration: "00:53:02"
size: 0
file: 218.mp3
social-background: 218.png
publication: 2026-07-22 09:00:00 +0200
author: "Romain Jourdan"
category: podcasts
aws-categories:
  - "Machine Learning & AI"
  - "Developer Tools"
  - "DevOps"
links:
  - text: "Thomson Reuters — AI & Technology"
    link: https://www.thomsonreuters.com/en/artificial-intelligence.html
  - text: "CoCounsel — AI Assistant for Legal Professionals"
    link: https://cococounsel.thomsonreuters.com/
  - text: "Amazon Bedrock AgentCore"
    link: https://aws.amazon.com/bedrock/agentcore/
  - text: "Strands Agents SDK"
    link: https://github.com/strands-agents/sdk-python
  - text: "AWS Summit London 2026"
    link: https://aws.amazon.com/events/summits/london/
  - text: "Automated Reasoning on AWS"
    link: https://www.amazon.science/research-areas/automated-reasoning
  - text: "Extreme Ownership — Jocko Willink & Leif Babin (Laura's Book Recommendation)"
    link: https://www.amazon.com/Extreme-Ownership-U-S-Navy-SEALs/dp/1250183863
  - text: "Laura Skylaki on LinkedIn"
    link: https://www.linkedin.com/in/lauraskylaki/
---

