---
title: 'CS336 - Assignment 5: Alignment & Reasoning RL'
publishDate: 2026-06-05
description: 'CS336 Assignment 5: align language models with supervised fine-tuning and reinforcement learning (expert iteration, GRPO) to improve math reasoning.'
tags:
  - Language Models
  - CS336
  - Alignment
  - Reinforcement Learning
  - Notes
language: 'en'
series: 'CS336 Language Modeling from Scratch'
seriesOrder: 5
---

Assignment 5 是收官之作:**对齐(Alignment)与推理 RL**。把一个只会续写的预训练模型,通过监督微调和强化学习,变成会听指令、能一步步做数学推理的模型。

## 概述

- 起点:预训练好的基座模型(如 Qwen 2.5 Math 1.5B)
- 手段:SFT + RL(expert iteration、GRPO)
- 任务:提升 MATH 等数学推理基准
- 可选 Part 2:DPO 等安全对齐方法

## 监督微调(SFT)

- 用 (prompt, response) 对做指令微调
- 只在 response 上计算 loss(mask 掉 prompt)
- 数据质量与格式(chat template)的重要性

## 数学推理任务

- 数据集:MATH、GSM8K
- Chain-of-Thought:让模型显式写出推理步骤
- 答案抽取与验证(verifier / 规则匹配)

## Expert Iteration

- 用当前模型采样多条解答,**保留答对的**作为新的 SFT 数据,迭代自举
- 与 rejection sampling 的关系

## GRPO 及变体

Group Relative Policy Optimization:对同一 prompt 采样一组回答,用组内相对优势做策略梯度,省去 critic 网络。

$$
\hat{A}_i = \frac{r_i - \text{mean}(\{r_1,\dots,r_G\})}{\text{std}(\{r_1,\dots,r_G\})}
$$

- 与 PPO 的对比:去掉 value model
- KL 正则、reward 设计(答案正确性 + 格式)

> 待补充:GRPO 的完整目标函数、采样组大小、训练稳定性技巧。

## 在 Qwen2.5-Math-1.5B 上做 RL

- 在可验证奖励(verifiable reward)上训练
- 监控:reward 曲线、回答长度、KL 散度

## 评估

- MATH / GSM8K 准确率
- (可选)指令遵循:AlpacaEval 等

## (可选)DPO 安全对齐

- Direct Preference Optimization:直接从偏好对优化,无需显式 reward model

$$
\mathcal{L}_{\text{DPO}} = -\log \sigma\!\left(\beta \log \frac{\pi_\theta(y_w|x)}{\pi_{\text{ref}}(y_w|x)} - \beta \log \frac{\pi_\theta(y_l|x)}{\pi_{\text{ref}}(y_l|x)}\right)
$$

## 参考资料

- [Assignment 5 仓库](https://github.com/stanford-cs336/assignment5-alignment)
- Shao et al., *DeepSeekMath (GRPO)* (2024)
- Rafailov et al., *Direct Preference Optimization (DPO)* (2023)
- Hendrycks et al., *MATH dataset* (2021)
