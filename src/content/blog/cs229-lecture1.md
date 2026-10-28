---
title: 'CS229 Machine Learning - Linear Regression'
publishDate: 2026-03-02
description: 'Introduction to linear regression: variable definitions, probabilistic interpretation, LMS algorithm (gradient descent), and locally weighted regression.'
tags:
  - Machine Learning
  - CS229
  - Notes
language: 'zh'
series: 'CS229 Machine Learning'
seriesOrder: 1
summary: '把误差项假设为高斯噪声后，最大似然估计恰好等价于最小二乘，再用梯度下降迭代求解，并以局部加权回归拟合非线性。'
---

在这篇博客中，我们来讨论线性回归问题，笔者才疏学浅，如有出错，请读者多多指正。

## 线性回归的变量定义

我们首先研究的线性回归问题，机器学习通俗上来讲，实际上是给定一个函数的输入和输出，让计算机来给我们人类这个函数到底是什么的一种方式。而机器学习又可以分为几类问题，其中当预测的目标变量为连续值时，称这类学习问题为回归问题，而线性表示机器学习研究的这个函数是线性函数。

为了更好地研究我们这门课的问题，我们可以先进行一些约定

- 约定用 $x^{(i)}$ 表示"输入"变量，也称作输入**特征**
- 约定用 $y^{(i)}$ 表示"输出"变量，也称作目标变量

我们学习的线性回归问题是一个监督学习问题，可以形式化表述为：给定一个训练集，目标是学习一个函数 $h: \mathcal{X} \mapsto \mathcal{Y}$，该函数能够根据输入 $x$ 预测目标值 $y$，使输出 $h(x)$ 尽可能接近真实值。

出于历史原因，函数 $h$ 被称为**假设**。

## 概率解释

为了研究如何求解线性回归算法的最优值解法，我们需要建立一个模型来推导出我们需要最小化什么来求解出最后的线性回归结果。这句话有些绕口，其实就是

假设输入变量和输出变量之间的关系可以通过以下方程进行建模

$$
y^{(i)} = \theta^T x^{(i)} + \epsilon^{(i)}
$$

此处 $\epsilon^{(i)}$ 表示误差项，它包含模型中未建模的因素与随机噪声。我们进一步假定这些误差独立同分布，并满足 $\epsilon^{(i)} \sim \mathcal{N}(0, \sigma^2)$。在这个假设下，最大化训练集的似然等价于最小化平方误差。

定义代价函数

$$
J(\theta) = \frac{1}{2m}\sum_{i=1}^{m}\left(h_\theta(x^{(i)}) - y^{(i)}\right)^2
$$

## 最小均方算法

我们考虑一种搜索算法：该算法从对 $\theta$ 的某个"初始猜测"开始，然后不断地调整 $\theta$ 的值，使其沿着使 $J(\theta)$ 减小的方向移动，直到最终收敛到最小化 $J(\theta)$ 的 $\theta$ 值。具体而言，我们考虑使用**梯度下降**算法。该算法从某个初始的 $\theta$ 值开始，并重复执行以下更新步骤

$$
\theta_j \leftarrow \theta_j - \alpha \frac{\partial}{\partial \theta_j}J(\theta)
$$

对线性回归，梯度可以写成矩阵形式：

$$
\theta \leftarrow \theta - \frac{\alpha}{m}X^T(X\theta-y)
$$

## 局部加权线性回归

现在我们再来仔细思考一下线性回归。如果待拟合的函数不是线性的，直接使用全局直线通常会产生较大误差。局部加权线性回归的做法是：对每个查询点 $x$，让距离它更近的训练样本拥有更大的权重，例如

$$
w^{(i)} = \exp\left(-\frac{\lVert x^{(i)}-x\rVert^2}{2\tau^2}\right)
$$

然后最小化加权平方误差

$$
J(\theta) = \frac{1}{2}\sum_i w^{(i)}\left(\theta^T x^{(i)}-y^{(i)}\right)^2.
$$

$\tau$ 控制局部范围：它越小，模型越关注查询点附近的样本，但也更容易受到噪声影响。
