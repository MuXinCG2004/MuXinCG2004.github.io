---
title: 'Algorithm Review - Basic Dynamic Programming'
publishDate: 2026-03-10
description: 'Review of knapsack problems (0/1, unbounded, bounded), Longest Increasing Subsequence (LIS), and Longest Common Subsequence (LCS).'
tags:
  - Algorithm
  - Dynamic Programming
  - Review
language: 'en'
series: 'Algorithm Review'
seriesOrder: 8
---

最近要准备华为机试，因此这个专栏为了让我复习一些简单的算法，由于正式机试不能带板子，所以我们需要熟悉常见的板子的写法。

## 01 背包

每件物品只能选或不选，从大到小遍历容量以避免重复选取。

```cpp
int dp[MAXW];
for (int i = 1; i <= n; i++)
    for (int j = W; j >= w[i]; j--)
        dp[j] = max(dp[j], dp[j - w[i]] + v[i]);
```

### 题目描述

<!-- TODO: 添加经典例题 -->

### 解析

<!-- TODO: 添加解析 -->

## 完全背包

每件物品可以无限选取，从小到大遍历容量。

```cpp
int dp[MAXW];
for (int i = 1; i <= n; i++)
    for (int j = w[i]; j <= W; j++)
        dp[j] = max(dp[j], dp[j - w[i]] + v[i]);
```

### 题目描述

<!-- TODO: 添加经典例题 -->

### 解析

<!-- TODO: 添加解析 -->

## 多重背包（二进制拆分）

每件物品有数量限制 $s_i$，通过二进制拆分将其转化为 01 背包。

```cpp
vector<int> nw, nv;
for (int i = 1; i <= n; i++) {
    int s = s_[i], k = 1;
    while (k <= s) {
        nw.push_back(k * w[i]);
        nv.push_back(k * v[i]);
        s -= k; k *= 2;
    }
    if (s > 0) { nw.push_back(s * w[i]); nv.push_back(s * v[i]); }
}
// 对 nw, nv 做 01 背包
```

### 题目描述

<!-- TODO: 添加经典例题 -->

### 解析

<!-- TODO: 添加解析 -->

## LIS（最长递增子序列）

维护一个 tails 数组，`tails[i]` 表示长度为 `i+1` 的递增子序列的最小末尾元素。

```cpp
int tails[MAXN], len = 0;
for (int i = 0; i < n; i++) {
    int pos = lower_bound(tails, tails + len, a[i]) - tails;
    tails[pos] = a[i];
    if (pos == len) len++;
}
```

### 题目描述

<!-- TODO: 添加经典例题 -->

### 解析

<!-- TODO: 添加解析 -->

## LCS（最长公共子序列）

经典二维 DP，`dp[i][j]` 表示 $a$ 的前 $i$ 个字符与 $b$ 的前 $j$ 个字符的 LCS 长度。

```cpp
int dp[MAXN][MAXN];
for (int i = 1; i <= n; i++)
    for (int j = 1; j <= m; j++)
        if (a[i] == b[j]) dp[i][j] = dp[i-1][j-1] + 1;
        else dp[i][j] = max(dp[i-1][j], dp[i][j-1]);
```

### 题目描述

<!-- TODO: 添加经典例题 -->

### 解析

<!-- TODO: 添加解析 -->

## 复杂度分析

- 01 背包 / 完全背包：$O(nW)$。
- 多重背包（二进制拆分）：$O(W \sum \log s_i)$。
- LIS：$O(n \log n)$。
- LCS：$O(nm)$。
