---
title: 'Algorithm Miscellany - Mathematics'
publishDate: 2026-03-10
description: 'Algorithm Miscellany series: mathematics-related algorithms.'
tags:
  - Algorithm
  - Review
language: 'en'
series: 'Algorithm Miscellany'
seriesOrder: 5
---

## 数论

### 数论基础

#### 整除

**定义**：设 $a, b \in \mathbb{Z}$，$a \neq 0$，如果 $\exists q \in \mathbb{Z}$，使得 $b = aq$，那么就说 $b$ 可被 $a$ 整除，记作 $a \mid b$，$b$ 不被 $a$ 整除记作 $a \nmid b$。

整除的性质：

- $a \mid b \Leftrightarrow -a \mid b \Leftrightarrow a \mid -b \Leftrightarrow |a| \mid |b|$
- $a \mid b \land b \mid c \Rightarrow a \mid c$
-

#### 约数

若 $a \mid b$，则称 $b$ 是 $a$ 的**倍数**，$a$ 是 $b$ 的**约数**。

$0$ 是所有非零整数的倍数，对于整数 $b \neq 0$，$b$ 的约数只有有限个。

平凡约数（平凡因数）：对于整数 $b \neq 0$，$\pm 1$、$\pm b$ 是 $b$ 的平凡约数。当 $b = \pm 1$ 时，$b$ 只有两个平凡约数。

#### 带余数除法

## 多项式和生成函数

### 基本概念

对于求和式 $\sum a_n x^n$，如果是有限项相加，称为多项式，记作 $f(x) = \sum_{n = 0}^{m} a_n x^n$。

可列项相加的求和式称为级数。在和
