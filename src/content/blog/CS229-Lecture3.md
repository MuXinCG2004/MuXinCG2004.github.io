---
title: 'CS229 Machine Learning - Generalized Linear Models'
publishDate: 2026-03-02
description: 'Introduction to exponential family distributions and generalized linear models, unifying linear regression and logistic regression.'
tags:
  - Machine Learning
  - CS229
  - Notes
language: 'en'
series: 'CS229 Machine Learning'
seriesOrder: 3
---

我们将在这节课中展示一个广义线性模型，

## 指数族

如果一类分布可以写成以下形式，则称其为指数族:

$$
p(y;\eta) = b(y)\exp(\eta^TT(y) - a(\eta))
$$

这里，$\eta$称为**自然参数**(也称为**典范参数**);$T(y)$是**充分统计量**(对于所考虑的分布，通常有$T(y) = y$);

## 构造广义线性模型

### 普通最小二乘

### 逻辑回归