---
title: 'Algorithm Review - Prefix Sum and Difference Array'
publishDate: 2026-03-10
description: '复习一维/二维前缀和与差分数组，掌握区间求和与区间修改的基本技巧。'
tags:
  - 算法
  - 数据结构
  - 复习
language: '中文'
series: '算法复习'
seriesOrder: 4
---

最近要准备华为机试，因此这个专栏为了让我复习一些简单的算法，由于正式机试不能带板子，所以我们需要熟悉常见的板子的写法。

## 一维前缀和

前缀和是一种预处理技巧，通过预先计算前缀的累加和，可以在 $O(1)$ 时间内回答任意区间 $[l, r]$ 的求和查询。

```cpp
int a[MAXN], pre[MAXN];
void build() {
    for (int i = 1; i <= n; i++) pre[i] = pre[i-1] + a[i];
}
int query(int l, int r) { return pre[r] - pre[l-1]; }
```

### 题目描述

<!-- TODO: 添加经典例题 -->

### 解析

<!-- TODO: 添加解析 -->

## 一维差分

差分是前缀和的逆运算，可以将区间修改转化为单点修改，适合处理多次区间加减的场景。

```cpp
int diff[MAXN];
void add(int l, int r, int v) { diff[l] += v; diff[r+1] -= v; }
// 对 diff 做前缀和即可还原
```

### 题目描述

<!-- TODO: 添加经典例题 -->

### 解析

<!-- TODO: 添加解析 -->

## 二维前缀和

二维前缀和将一维的思想推广到矩阵上，利用容斥原理可以在 $O(1)$ 时间内查询任意子矩阵的元素之和。

```cpp
int pre[MAXN][MAXN];
void build2d() {
    for (int i = 1; i <= n; i++)
        for (int j = 1; j <= m; j++)
            pre[i][j] = a[i][j] + pre[i-1][j] + pre[i][j-1] - pre[i-1][j-1];
}
int query2d(int x1, int y1, int x2, int y2) {
    return pre[x2][y2] - pre[x1-1][y2] - pre[x2][y1-1] + pre[x1-1][y1-1];
}
```

### 题目描述

<!-- TODO: 添加经典例题 -->

### 解析

<!-- TODO: 添加解析 -->

## 二维差分

```cpp
void add2d(int x1, int y1, int x2, int y2, int v) {
    diff[x1][y1] += v;
    diff[x2+1][y1] -= v;
    diff[x1][y2+1] -= v;
    diff[x2+1][y2+1] += v;
}
```

### 题目描述

<!-- TODO: 添加经典例题 -->

### 解析

<!-- TODO: 添加解析 -->

## 复杂度分析

- 前缀和：预处理 $O(n)$（一维）/ $O(nm)$（二维），查询 $O(1)$。
- 差分：修改 $O(1)$，还原 $O(n)$（一维）/ $O(nm)$（二维）。
