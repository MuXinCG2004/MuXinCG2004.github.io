---
title: 'Algorithm Review - Union-Find'
publishDate: 2026-03-10
description: 'Review of Union-Find with path compression, union by rank, and weighted Union-Find.'
tags:
  - Algorithm
  - Data Structure
  - Review
language: 'en'
series: 'Algorithm Review'
seriesOrder: 10
---

最近要准备华为机试，因此这个专栏为了让我复习一些简单的算法，由于正式机试不能带板子，所以我们需要熟悉常见的板子的写法。

## 基础并查集

并查集用于维护元素的分组关系，支持合并和查询操作。路径压缩 + 按秩合并可以使单次操作接近 $O(1)$。

```cpp
int fa[MAXN], rk[MAXN];

void init(int n) {
    for (int i = 1; i <= n; i++) fa[i] = i, rk[i] = 0;
}

int find(int x) {
    return fa[x] == x ? x : fa[x] = find(fa[x]);
}

void unite(int x, int y) {
    x = find(x); y = find(y);
    if (x == y) return;
    if (rk[x] < rk[y]) swap(x, y);
    fa[y] = x;
    if (rk[x] == rk[y]) rk[x]++;
}

bool connected(int x, int y) { return find(x) == find(y); }
```

### 题目描述

<!-- TODO: 添加经典例题 -->

### 解析

<!-- TODO: 添加解析 -->

## 带权并查集

在并查集的基础上维护节点到根的关系（权值），路径压缩时同步更新权值。以食物链为例，维护与根节点的关系（模 3）：

```cpp
int fa[MAXN], d[MAXN];

int find(int x) {
    if (fa[x] == x) return x;
    int root = find(fa[x]);
    d[x] = (d[x] + d[fa[x]]) % 3;
    return fa[x] = root;
}
```

### 题目描述

<!-- TODO: 添加经典例题 -->

### 解析

<!-- TODO: 添加解析 -->

## 复杂度分析

- 路径压缩 + 按秩合并：单次操作均摊 $O(\alpha(n))$，其中 $\alpha$ 为反阿克曼函数，实际可视为 $O(1)$。
