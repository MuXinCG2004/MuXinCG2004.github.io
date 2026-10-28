---
title: 'CS336 - Assignment 4: Data Processing & Filtering'
publishDate: 2026-06-05
description: 'CS336 Assignment 4: turn raw Common Crawl into pretraining data — HTML-to-text extraction, quality and safety filtering, PII removal, and deduplication.'
tags:
  - Language Models
  - CS336
  - Data
  - Notes
language: 'zh'
series: 'CS336 Language Modeling from Scratch'
seriesOrder: 4
summary: '把原始 Common Crawl 变成预训练语料：WARC 抽正文、fastText 识别语言、Gopher 规则与分类器过滤、PII 脱敏与去重。'
---

Assignment 4 关注**预训练数据**：把原始 Common Crawl 网页转化成干净、可用的训练语料。"模型质量的上限由数据决定"——这一篇就是在抬高这个上限。

## 概述

- 输入：原始 Common Crawl dump(海量、嘈杂的网页)
- 输出：经过清洗、过滤、去重的高质量文本
- 用数据消融验证：更好的数据 → 更低的 loss

## Common Crawl 格式

- **WARC**：原始 HTTP 响应(含 HTML)
- **WET**：已抽取的纯文本
- 规模与抽样策略

## HTML → Text

- 从 WARC 中抽取正文，去除导航/广告/样板(boilerplate)
- 常用库：`resiliparse`、`trafilatura`

## 语言识别

- 用 fastText 等模型识别语言，过滤非目标语言
- 置信度阈值的取舍

## 质量过滤

- **启发式规则(Gopher rules)**：文档长度、符号比例、停用词比例等
- **分类器过滤**：用高质量语料(如 Wikipedia)训练分类器打分
- 召回率 vs 精确率的平衡

## 有害内容与 PII 过滤

- 有害/NSFW 内容检测
- PII(个人身份信息)：邮箱、电话、IP 等的识别与脱敏

## 去重

- **精确去重**:hash 整段/整文档
- **模糊去重**:MinHash + LSH 近似检测相似文档
- 去重粒度(文档级 vs 行级)与对下游的影响

MinHash 用多组随机置换把集合压缩成签名：两个文档在某一列签名相同的概率等于它们的 Jaccard 相似度。将签名按 band 分桶可以快速生成候选对，再对候选文档做精确相似度校验。band 数量和每个 band 的行数决定召回率与候选数量，需要在验证集上按误删率和去重率调参。

## 数据消融与评估

- 控制变量训练小模型，比较不同数据处理流水线
- 用下游困惑度/任务指标衡量数据质量

## 参考资料

- [Assignment 4 仓库](https://github.com/stanford-cs336/assignment4-data)
- [Common Crawl](https://commoncrawl.org/)
- Rae et al., *Gopher* (2021);Penedo et al., *RefinedWeb* (2023)
- Lee et al., *Deduplicating Training Data* (2021)
