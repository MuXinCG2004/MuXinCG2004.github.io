---
title: 'CS336 - Assignment 3: Scaling Laws'
publishDate: 2026-06-05
description: 'CS336 Assignment 3: fit neural scaling laws using the IsoFLOP method and a training API to predict compute-optimal model size and data.'
tags:
  - Language Models
  - CS336
  - Scaling Laws
  - Notes
language: 'en'
series: 'CS336 Language Modeling from Scratch'
seriesOrder: 3
---

Assignment 3 研究**缩放定律(Scaling Laws)**:在给定算力预算下,模型应该多大、数据应该多少,才能让 loss 最低?这一篇把"凭感觉调参"变成"用规律外推"。

## 概述

- 不能无限训练大模型,只能训练一批小模型,**拟合规律后外推**
- 通过查询一个 training API 收集 (FLOPs, loss) 数据点
- 目标:预测 compute-optimal 的模型规模与数据量

## Scaling Laws 背景

### Kaplan et al. (2020)

- loss 随参数量 $N$、数据量 $D$、算力 $C$ 呈幂律下降

$$
L(N) \approx \left(\frac{N_c}{N}\right)^{\alpha_N}
$$

### Chinchilla(Hoffmann et al., 2022)

- 参数与数据应**同比例增长**(约 20 tokens / 参数)
- 联合形式:

$$
L(N, D) = E + \frac{A}{N^{\alpha}} + \frac{B}{D^{\beta}}
$$

## IsoFLOP 方法

- 固定若干算力预算 $C$,在每个预算下用不同 $N$ 训练
- 每条 IsoFLOP 曲线的最低点 → 该预算下的最优模型大小
- 把各预算的最优点连起来 → $N_{opt}(C)$、$D_{opt}(C)$ 的幂律

> 待补充:FLOPs 估算公式 $C \approx 6ND$ 的推导;曲线拟合的实现细节。

## Training API 与数据收集

- 用有限的 query 预算换取最多信息量的数据点
- 如何选择 $(N, D)$ 网格、如何处理噪声

## 拟合与外推

- 用最小二乘 / Huber loss 拟合幂律参数
- 外推到目标算力,给出最优配置
- 误差分析与置信区间

## 参考资料

- [Assignment 3 仓库](https://github.com/stanford-cs336/assignment3-scaling)
- Kaplan et al., *Scaling Laws for Neural Language Models* (2020)
- Hoffmann et al., *Training Compute-Optimal LLMs (Chinchilla)* (2022)
