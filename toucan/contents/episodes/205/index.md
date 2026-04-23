---
title: "95% Faster: How CyberArk Used Iceberg & AI Agents to Crush Support Bottlenecks"
description: "CyberArk's support team was drowning in logs. With 40+ products across SaaS and self-hosted environments, each generating logs in different formats, support engineers were spending days just preparing data before they could even start investigating a customer issue. Complex cases took up to 15 days to resolve.
Moshiko Ben Abu, a Software Engineer at CyberArk — now part of Palo Alto Networks — built an AI-powered system that changed all of that. In this episode, he walks us through the full architecture: replacing manual regex parsers with AI-generated grok patterns using Amazon Bedrock and Claude, storing structured data in Apache Iceberg tables via PyIceberg with automatic schema evolution, and querying everything through Athena — all while keeping PII masked and data encrypted in S3.
But the real breakthrough came with agents. Moshiko describes how he moved from single-product Bedrock agents to a swarm of specialized AI agents built with the Strands framework, where agents investigating product A can autonomously call agents for product B and C to trace root causes across the entire stack. Cases that took 15 days now resolve in hours. Simple cases drop from 4-6 hours to 15-30 minutes. Engineers handle 4x more cases per day.
We also dig into the security layer — Cedar policies and Amazon Verified Permissions for agent authorization, the identity integration with AgentCore, and what's coming next: S3 Tables, AgentCore in production, and cross-platform agent collaboration with Palo Alto. Moshiko's advice for developers getting started? Learn IAM first, then compute, then databases — and write everything in CDK."
guests:
  - name: "Moshiko Ben Abu"
    link: https://www.linkedin.com/in/moshiko-b-44328b10a/
    title: "Software Engineer, CyberArk (a Palo Alto Networks company)"
episode: 205
duration: "00:51:36"
size: 0
file: 205.mp3
social-background: 205.png
publication: 2026-04-22 08:00:00 +0100
author: "Romain Jourdan"
category: podcasts
aws-categories:
  - "Machine Learning & AI"
  - "Analytics"
  - "Security, Identity & Compliance"
links:
- text: "How CyberArk Uses Apache Iceberg and Amazon Bedrock to Deliver up to 4x Support Productivity — AWS Blog"
  link: https://aws.amazon.com/blogs/big-data/how-cyberark-uses-apache-iceberg-and-amazon-bedrock-to-deliver-up-to-4x-support-productivity/
- text: "Apache Iceberg on AWS"
  link: https://aws.amazon.com/big-data/datalakes-and-analytics/apache-iceberg/
- text: "PyIceberg — Apache Iceberg Python Library"
  link: https://py.iceberg.apache.org/
- text: "Amazon Bedrock AgentCore"
  link: https://aws.amazon.com/bedrock/agentcore/
- text: "Strands Agents — Open-Source Agentic Framework"
  link: https://strandsagents.com/
- text: "Cedar Policy Language"
  link: https://www.cedarpolicy.com/
- text: "Amazon Verified Permissions"
  link: https://aws.amazon.com/verified-permissions/
- text: "Amazon S3 Tables"
  link: https://aws.amazon.com/s3/features/tables/
- text: "Kiro — AI-Powered Development Environment"
  link: https://kiro.dev/
- text: "AWS CDK (Cloud Development Kit)"
  link: https://aws.amazon.com/cdk/
- text: "Ran the Builder — Ran Isenberg's Serverless Blog"
  link: https://ranthebuilder.cloud/
- text: "Ran Isenberg — AWS Serverless Hero"
  link: https://aws.amazon.com/developer/community/heroes/ran-isenberg/
---
