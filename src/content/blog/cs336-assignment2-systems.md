---
title: 'CS336 - Assignment 2: Systems (Triton & Distributed)'
publishDate: 2026-06-05
description: 'CS336 Assignment 2: profile and benchmark the model, implement FlashAttention-2 in Triton, and build distributed data parallel with optimizer sharding.'
tags:
  - Language Models
  - CS336
  - Triton
  - Distributed Training
  - Notes
language: 'en'
series: 'CS336 Language Modeling from Scratch'
seriesOrder: 2
---

Assignment 2 关注**系统与性能**:让 A1 的模型跑得更快(自定义 kernel)、跑得更大(分布式)。这一步把"能训练"变成"训练得起"。

## 概述

- 先 profile 找瓶颈,再针对性优化
- 用 Triton 手写 FlashAttention-2,替换朴素注意力
- 从零实现分布式数据并行 + 优化器状态分片

## Benchmarking & Profiling

- 端到端基准:forward / backward / optimizer step 各占多少时间
- 工具:PyTorch profiler、`nsys`、CUDA events
- 显存分析:激活、参数、优化器状态、梯度各占多少
- 注意 warmup 与 `torch.cuda.synchronize()` 的正确计时

## FlashAttention-2(Triton)

朴素注意力会显式构造 $N \times N$ 的注意力矩阵,显存随序列长度平方增长。FlashAttention 通过分块(tiling)+ online softmax 避免落地这个矩阵。

### Online Softmax

- 分块累加时维护 running max $m$ 与 running sum $\ell$,数值稳定地合并各块结果

### 前向 kernel

- 沿 KV 分块遍历,逐块更新输出与归一化统计量
- Triton 编程模型:`program_id`、block pointer、`tl.load/tl.store`

### 反向 kernel

- 重计算(recomputation)换显存
- 推导 $dQ, dK, dV$ 的梯度公式

> 待补充:tiling 大小的选择、寄存器/共享内存压力、与 PyTorch SDPA 的对比基准。

## 分布式训练

### 通信原语

- `all-reduce`、`all-gather`、`reduce-scatter` 的语义与代价
- 带宽 vs 延迟,ring vs tree

### 数据并行(DDP)

- naive DDP:每步对梯度做 all-reduce
- 优化:bucketing、计算与通信 overlap

### 优化器状态分片(ZeRO)

- ZeRO-1:把优化器状态切分到各 rank,显著降低显存
- 与 DDP 的组合

## 参考资料

- [Assignment 2 仓库](https://github.com/stanford-cs336/assignment2-systems)
- Dao et al., *FlashAttention* (2022) / *FlashAttention-2* (2023)
- [Triton 文档](https://triton-lang.org/)
- Rajbhandari et al., *ZeRO* (2019)
