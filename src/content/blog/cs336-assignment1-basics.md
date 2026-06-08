---
title: 'CS336 - Assignment 1: Tokenizer & Transformer Basics'
publishDate: 2026-06-05
description: 'CS336 Assignment 1: implement a BPE tokenizer, the Transformer architecture (RMSNorm, RoPE, SwiGLU), and AdamW from scratch, then train on TinyStories.'
tags:
  - Language Models
  - CS336
  - Transformer
  - Tokenization
  - Notes
language: 'en'
series: 'CS336 Language Modeling from Scratch'
seriesOrder: 1
---

Assignment 1 的目标是**只用 PyTorch primitives 从零搭起一个完整的语言模型**:从字节流到 token,从 token 到 Transformer,再到能够训练收敛的训练循环。这一篇是整个系列的地基。

## 概述

- 限制:不能用 `torch.nn.Transformer`,甚至不能用 `torch.nn.Linear`
- 产出:一个可在 TinyStories / OpenWebText 上训练的 LM
- 关注点:理解每个组件**为什么这样设计**,以及它的计算/显存代价

## BPE Tokenizer

在第一个作业的第一节中，我们被要求实现一个BPE分词器，首先我们要明白这个的原理，我们首先将文档按UTF-8转换，然后在训练过程中，每次找到出现频率最高的相邻两个词进行合并。

CS336的这一部分，首先添加了special_tokens，就是


## Transformer 架构

逐个组件实现,组合成 decoder-only 的因果语言模型。

### Embedding

- token embedding(本课通常不使用可学习的绝对位置 embedding)

### RMSNorm

相比 LayerNorm 去掉了均值中心化,更省算力:

$$
\text{RMSNorm}(x) = \frac{x}{\sqrt{\frac{1}{d}\sum_{i=1}^{d} x_i^2 + \epsilon}} \cdot g
$$

### RoPE(旋转位置编码)

- 通过对 Q、K 做旋转,把相对位置信息注入注意力
- 为什么优于绝对位置编码

### 因果多头自注意力

$$
\text{Attention}(Q, K, V) = \text{softmax}\!\left(\frac{QK^\top}{\sqrt{d_k}} + M\right)V
$$

- 因果 mask $M$:防止看到未来 token
- 多头的拆分与拼接

### SwiGLU 前馈层

- Gated 激活:$\text{SwiGLU}(x) = (\text{SiLU}(xW_1) \odot xW_3)W_2$
- 为什么用门控、隐藏维度如何设置

## 训练

### 损失函数

- 交叉熵(cross-entropy)与困惑度(perplexity)的关系

### AdamW 优化器

从零实现,注意 weight decay 与梯度更新解耦:

> 待补充:一阶/二阶矩、bias correction、与 Adam 的区别。

### 学习率调度

- Warmup + cosine decay
- 梯度裁剪(gradient clipping)

### 数据加载与 checkpointing

- 内存映射(memmap)读取 token、按需采样 batch
- 保存/恢复模型与优化器状态

## 实验

- **TinyStories**:小数据集,快速验证实现正确性
- **OpenWebText**:更接近真实规模
- 消融:学习率、batch size、架构超参对 loss 的影响

## 参考资料

- [Assignment 1 仓库](https://github.com/stanford-cs336/assignment1-basics)
- Vaswani et al., *Attention Is All You Need* (2017)
- Su et al., *RoFormer: RoPE* (2021);Shazeer, *GLU Variants* (2020)
- Loshchilov & Hutter, *Decoupled Weight Decay (AdamW)* (2017)
