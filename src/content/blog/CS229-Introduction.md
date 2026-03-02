---
title: 'CS229 机器学习 - 引言与概述'
publishDate: 2026-03-02
description: 'Stanford CS229 机器学习课程笔记系列，涵盖监督学习、无监督学习与强化学习核心内容。'
tags:
  - 机器学习
  - CS229
  - 笔记
language: '中文'
series: 'CS229 机器学习'
seriesOrder: 1
---

Stanford CS229 是最经典的机器学习入门课程之一。本系列将系统整理课程的核心知识点，从线性回归到深度学习，逐步构建机器学习的完整知识体系。

## 课程概述

CS229 由 Andrew Ng 主讲，是 Stanford 最受欢迎的课程之一。课程内容主要分为三大部分：

- **监督学习 (Supervised Learning)**：从带标签的数据中学习映射关系
- **无监督学习 (Unsupervised Learning)**：从无标签数据中发现隐藏结构
- **强化学习 (Reinforcement Learning)**：通过与环境交互学习最优策略

## 数学基础

在开始之前，需要具备以下数学基础：

### 线性代数

矩阵运算、特征值分解、SVD 等。例如，对于矩阵 $A \in \mathbb{R}^{m \times n}$，其转置记为 $A^T$。

### 概率论与统计

条件概率、贝叶斯定理、常见分布等。贝叶斯定理：

$$
P(A \mid B) = \frac{P(B \mid A) \, P(A)}{P(B)}
$$

### 微积分

梯度、偏导数、链式法则。对于函数 $f: \mathbb{R}^n \to \mathbb{R}$，其梯度定义为：

$$
\nabla f(x) = \begin{bmatrix} \frac{\partial f}{\partial x_1} \\ \frac{\partial f}{\partial x_2} \\ \vdots \\ \frac{\partial f}{\partial x_n} \end{bmatrix}
$$

## 系列文章规划

本系列计划涵盖以下主题：

1. **线性回归与正规方程** - 最小二乘法、梯度下降
2. **逻辑回归与广义线性模型** - 分类问题、指数族分布
3. **生成学习算法** - GDA、朴素贝叶斯
4. **支持向量机** - 最大间隔、核方法、SMO 算法
5. **学习理论** - 偏差方差权衡、VC 维、正则化
6. **无监督学习** - K-means、EM 算法、PCA
7. **强化学习** - MDP、值迭代、策略梯度

## 参考资料

- [CS229 课程主页](https://cs229.stanford.edu/)
- Andrew Ng 的课程讲义 (Course Notes)
- *Pattern Recognition and Machine Learning* - Christopher Bishop
