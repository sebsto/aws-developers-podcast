---
title: "The Hard Lessons of Cloud Migration: inDrive's Path from Monolith to Microservices"
description: "Join us for a fascinating conversation with Alexander 'Sasha' Lisachenko (Software Architect) and Artem Gab (Senior Engineering Manager) from inDrive, one of the global leaders in mobility operating in 49 countries and processing over 8 million rides per day.
Sasha and Artem take us through their four-year transformation journey from a monolithic bare-metal setup in a single data center to a fully cloud-native microservices architecture on AWS. They share the hard-earned lessons from their migration, including critical challenges with Redis cluster architecture, the discovery of single-threaded CPU bottlenecks, and how they solved hot key problems using Uber's H3 hexagon-based geospatial indexing.
We dive deep into their migration from Redis to Valkey on ElastiCache, achieving 15-20% cost optimization and improved memory efficiency, and their innovative approach to auto-scaling ElastiCache clusters across multiple dimensions. Along the way, they reveal how TLS termination on master nodes created unexpected bottlenecks, how connection storms can cascade when Redis slows down, and why engine CPU utilization is the one metric you should never ignore.
This is a story of resilience, technical problem-solving, and the reality of large-scale cloud transformations — complete with rollbacks, late-night incidents, and the eventual triumph of a fully elastic, geo-distributed platform serving riders and drivers across the globe."
guests:
  - name: "Alexander Lisachenko"
    link: https://www.linkedin.com/in/lisachenko/
    title: "Software Architect, inDrive"
  - name: "Artem Gab"
    link: https://www.linkedin.com/in/artemgab/
    title: "Senior Engineering Manager, Runtime Systems, inDrive"
episode: 201
duration: "01:13:58"
size: 0
file: 201.mp3
social-background: 201.png
publication: 2026-03-25 08:00:00 +0100
author: "Romain Jourdan"
category: podcasts
aws-categories:
  - "Databases"
  - "Containers"
  - "Migration"
links:
- text: "Redis in Action — Josiah L. Carlson (Manning)"
  link: https://www.manning.com/books/redis-in-action
- text: "AWS Well-Architected Framework — ElastiCache Lens"
  link: https://docs.aws.amazon.com/AmazonElastiCache/latest/mem-ug/WellArchitechtedLens.html
- text: "Brendan Gregg's Blog — Performance Analysis & Observability"
  link: https://www.brendangregg.com/
- text: "Uber H3 — Hexagonal Hierarchical Spatial Index"
  link: https://www.uber.com/en-PL/blog/h3/
- text: "inDrive Website"
  link: https://indrive.com
- text: "AWS ElastiCache Documentation"
  link: https://docs.aws.amazon.com/elasticache/
- text: "Valkey Project"
  link: https://valkey.io
- text: "AWS Well-Architected Framework"
  link: https://aws.amazon.com/architecture/well-architected/
---
