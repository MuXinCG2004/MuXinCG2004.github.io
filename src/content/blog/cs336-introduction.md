---
title: 'CS336 Language Modeling from Scratch - Introduction'
publishDate: 2026-06-05
description: 'Overview of the Stanford CS336 series: building a language model from scratch through five hands-on assignments, from tokenizer to alignment.'
tags:
  - Language Models
  - CS336
  - Notes
language: 'en'
series: 'CS336 Language Modeling from Scratch'
seriesOrder: 0
---

Stanford CS336《Language Modeling from Scratch》是一门"从零构建大语言模型"的硬核课程,由 Percy Liang 与 Tatsunori Hashimoto 等主讲。它的核心理念是:**研究者正在与语言模型的底层细节脱节,而这门课通过让你亲手实现一切来弥补这一点。** 课程几乎不提供脚手架代码,你需要从 tokenizer、Transformer 一直手写到分布式训练与对齐。

本系列笔记按 CS336 的 **5 个 Assignment** 组织,每篇对应一个作业单元,记录核心概念、实现要点与踩坑总结。

## 为什么"从零开始"

- 现成框架(`torch.nn.Transformer`、HuggingFace 等)隐藏了太多关键细节
- 只有亲手实现,才能真正理解每个组件的作用与代价
- Assignment 1 甚至**只允许使用 PyTorch primitives**,连 `torch.nn.Linear` 都不能直接调用

## 前置知识

- **Python 与软件工程**:本课代码量是普通课程的一个数量级以上
- **PyTorch**:张量操作、autograd、广播机制
- **数学基础**:线性代数、概率论、微积分(梯度、链式法则)
- **深度学习基础**:反向传播、优化器、注意力机制

## 系列文章规划

| # | Assignment | 主题 | 关键词 |
|---|-----------|------|--------|
| 1 | Basics | 从零实现 LM | BPE、Transformer、AdamW、训练 |
| 2 | Systems | 系统与性能优化 | Profiling、Triton FlashAttention2、分布式 |
| 3 | Scaling | 缩放定律 | IsoFLOP、compute-optimal |
| 4 | Data | 数据处理 | Common Crawl、过滤、去重 |
| 5 | Alignment | 对齐与推理 RL | SFT、GRPO、数学推理 |

## 课程主线

```
原始文本 → [A1] Tokenizer + Transformer + 训练
        → [A2] 让它跑得快(kernel)、跑得大(分布式)
        → [A3] 用 scaling law 预测怎么花算力最划算
        → [A4] 准备高质量预训练数据
        → [A5] 对齐:让模型听话、会推理
```

## 参考资料

- [CS336 课程主页](https://cs336.stanford.edu/)
- [CS336 Spring 2025 存档](https://cs336.stanford.edu/spring2025/)(含完整作业与资料)
- [CS336 Lecture Videos (YouTube)](https://www.youtube.com/playlist?list=PLoROMvodv4rOY23Y0BoGoBGgQ1zmU_MT_)
- 各 Assignment 官方仓库:[stanford-cs336](https://github.com/stanford-cs336)
