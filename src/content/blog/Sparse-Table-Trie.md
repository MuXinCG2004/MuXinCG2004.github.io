---
title: '算法复习系列 - ST 表与字典树'
publishDate: 2026-03-10
description: '复习 ST 表解决 RMQ 问题和字典树（Trie）的前缀查询写法。'
tags:
  - 算法
  - 数据结构
  - 复习
language: '中文'
series: '算法复习'
seriesOrder: 12
---

最近要准备华为机试，因此这个专栏为了让我复习一些简单的算法，由于正式机试不能带板子，所以我们需要熟悉常见的板子的写法。

## ST 表

ST 表是解决静态 RMQ（区间最值查询）的经典数据结构，基于倍增思想，$O(n \log n)$ 预处理后可以 $O(1)$ 回答查询。

```cpp
int st[MAXN][21], lg[MAXN];

void build() {
    for (int i = 2; i <= n; i++) lg[i] = lg[i / 2] + 1;
    for (int i = 1; i <= n; i++) st[i][0] = a[i];
    for (int j = 1; (1 << j) <= n; j++)
        for (int i = 1; i + (1 << j) - 1 <= n; i++)
            st[i][j] = max(st[i][j-1], st[i + (1 << (j-1))][j-1]);
}

int query(int l, int r) {
    int k = lg[r - l + 1];
    return max(st[l][k], st[r - (1 << k) + 1][k]);
}
```

### 题目描述

<!-- TODO: 添加经典例题 -->

### 解析

<!-- TODO: 添加解析 -->

## 字典树（Trie）

字典树是一种多叉树结构，用于高效存储和查询字符串集合，支持前缀匹配。

```cpp
int ch[MAXN][26], cnt[MAXN], tot = 0;

void insert(const char *s) {
    int u = 0;
    for (int i = 0; s[i]; i++) {
        int c = s[i] - 'a';
        if (!ch[u][c]) ch[u][c] = ++tot;
        u = ch[u][c];
    }
    cnt[u]++;
}

int query(const char *s) {
    int u = 0;
    for (int i = 0; s[i]; i++) {
        int c = s[i] - 'a';
        if (!ch[u][c]) return 0;
        u = ch[u][c];
    }
    return cnt[u];
}
```

### 题目描述

<!-- TODO: 添加经典例题 -->

### 解析

<!-- TODO: 添加解析 -->

## 复杂度分析

- ST 表：预处理 $O(n \log n)$，查询 $O(1)$。
- 字典树：插入 / 查询 $O(|s|)$，$|s|$ 为字符串长度。
