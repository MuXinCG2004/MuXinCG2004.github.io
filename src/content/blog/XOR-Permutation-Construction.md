---
title: 'XOR Convenience - Codeforces 题解'
publishDate: 2026-02-26
description: '构造排列使得每个位置的值与某后续位置值的异或等于下标，核心思路是让所有异或结果统一指向最后一个位置。'
tags:
  - 算法
  - Codeforces
  - 构造
  - 位运算
language: '中文'
series: 'Codeforces 题解'
seriesOrder: 1
---

构造排列使得每个中间位置的值都能在后缀中找到与之异或等于下标的元素。本文从条件分析出发，推导出一个简洁的构造方案。

## 题目描述

给定正整数 $n$，构造一个长度为 $n$ 的排列 $p$（即 $1$ 到 $n$ 的某个排列），满足：

对每个 $i$（$2 \le i \le n-1$），存在某个 $j$（$i \le j \le n$），使得

$$
p[i] = p[j] \oplus i
$$

其中 $\oplus$ 表示按位异或。

## 思路分析

### 条件的等价变形

原条件要求：对每个 $i$（$2 \le i \le n-1$），存在 $j \ge i$ 使得 $p[j] = p[i] \oplus i$。

也就是说，值 $p[i] \oplus i$ 必须出现在位置 $\ge i$ 的某处。

### 关键观察

如果我们能让**所有** $p[i] \oplus i$（$2 \le i \le n-1$）都等于同一个值 $c$，并且把 $c$ 放在位置 $n$，那么所有条件自动满足——因为 $p[n] = c$ 出现在位置 $n \ge i$ 处。

### 确定构造

令 $c = 1$，即让 $p[i] \oplus i = 1$ 对所有 $2 \le i \le n-1$ 成立，也就是 $p[i] = i \oplus 1$。

- 当 $i$ 为偶数时，$p[i] = i + 1$
- 当 $i$ 为奇数时，$p[i] = i - 1$

这会把 $2, 3, \ldots, n-1$ 范围内的数两两配对交换。再令 $p[n] = 1$（即 $c$），最后把剩余的值分配给 $p[1]$。

### 剩余值分析

$p[i] = i \oplus 1$ 对 $2 \le i \le n-1$ 产生的值集合是 $\{2 \oplus 1, 3 \oplus 1, \ldots, (n-1) \oplus 1\} = \{3, 2, 5, 4, \ldots\}$，本质上是把 $\{2, 3, \ldots, n-1\}$ 内部做了两两交换，集合本身不变。

加上 $p[n] = 1$，已使用的值为 $\{1, 2, 3, \ldots, n-1\}$，所以 $p[1] = n$。

但需要验证 $n$ 是否已被使用。当 $n$ 为奇数时，$p[n-1] = (n-1) \oplus 1 = n$，此时 $n$ 已被占用。分两种情况：

- **$n$ 为偶数：** $p[n-1] = (n-1) \oplus 1 = n - 2$，值 $n$ 未被使用，$p[1] = n$。
- **$n$ 为奇数：** $p[n-1] = (n-1) \oplus 1 = n$，值 $n$ 已被使用，而 $n-1$ 未被使用，$p[1] = n - 1$。同时 $p[1]$ 不受条件约束（条件仅对 $2 \le i \le n-1$），所以合法。

### 正确性证明

对任意 $2 \le i \le n-1$：

$$
p[i] \oplus i = (i \oplus 1) \oplus i = 1 = p[n]
$$

因此 $j = n$ 即满足 $p[j] = p[i] \oplus i$，且 $j = n \ge i$，条件成立。

## 代码实现

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    scanf("%d", &t);
    while (t--) {
        int n;
        scanf("%d", &n);
        vector<int> p(n + 1);
        p[n] = 1;
        for (int i = 2; i <= n - 1; i++) {
            p[i] = i ^ 1;
        }
        if (n % 2 == 0) {
            p[1] = n;
        } else {
            p[1] = n - 1;
        }
        for (int i = 1; i <= n; i++) {
            printf("%d%c", p[i], " \n"[i == n]);
        }
    }
    return 0;
}
```

## 复杂度分析

- **时间复杂度：** $O(n)$，单次遍历构造排列。
- **空间复杂度：** $O(n)$，存储排列。
