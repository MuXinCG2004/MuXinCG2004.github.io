---
title: 'CS229 Machine Learning - Generalized Linear Models'
publishDate: 2026-03-02
description: 'Introduction to exponential family distributions and generalized linear models, unifying linear regression and logistic regression.'
tags:
  - Machine Learning
  - CS229
  - Notes
language: 'zh'
series: 'CS229 Machine Learning'
seriesOrder: 3
summary: '指数族的统一形式 p(y;η)=b(y)exp(ηᵀT(y)−a(η))，由它构造广义线性模型可把最小二乘与逻辑回归纳入同一框架。'
---

这一节用指数族分布统一解释线性回归与逻辑回归，并说明如何从分布的均值函数得到广义线性模型。

## 指数族

如果一类分布可以写成以下形式，则称其为指数族：

$$
p(y; \eta) = b(y) \exp(\eta^T T(y) - a(\eta))
$$

这里，$\eta$ 称为**自然参数**（也称为**典范参数**）；$T(y)$ 是**充分统计量**（对于所考虑的分布，通常有 $T(y) = y$）；

## 构造广义线性模型

### 普通最小二乘

高斯分布属于指数族。令自然参数与输入的线性函数相关，即 $\eta=\theta^Tx$，最大似然估计会导出平方误差目标，因此普通最小二乘可以视为一个广义线性模型。

### 逻辑回归

伯努利分布也属于指数族。它的均值是 $\mu=\mathbb{E}[y\mid x]=\sigma(\theta^Tx)$，因此取 logistic 函数作为逆链接函数，就得到逻辑回归。这个视角说明两种算法的差异主要来自观测变量的条件分布，而不是线性预测器本身。
