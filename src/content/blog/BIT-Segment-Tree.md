---
title: '算法复习系列 - 树状数组与线段树'
publishDate: 2026-03-10
description: '复习树状数组（BIT）和线段树的写法，掌握单点修改、区间修改与区间查询。'
tags:
  - 算法
  - 数据结构
  - 复习
language: '中文'
series: '算法复习'
seriesOrder: 11
---

最近要准备华为机试，因此这个专栏为了让我复习一些简单的算法，由于正式机试不能带板子，所以我们需要熟悉常见的板子的写法。

## 树状数组（BIT）

树状数组利用 lowbit 操作实现前缀和的高效维护，支持单点修改和区间查询。

```cpp
int tree[MAXN];

int lowbit(int x) { return x & (-x); }

void update(int i, int v) {
    for (; i <= n; i += lowbit(i)) tree[i] += v;
}

int query(int i) {
    int s = 0;
    for (; i > 0; i -= lowbit(i)) s += tree[i];
    return s;
}

int query(int l, int r) { return query(r) - query(l - 1); }
```

### 题目描述

<!-- TODO: 添加经典例题 -->

### 解析

<!-- TODO: 添加解析 -->

## 线段树

线段树支持区间修改和区间查询，通过 lazy 标记实现延迟下传。

```cpp
int tree[MAXN * 4], lazy[MAXN * 4];

void pushup(int p) { tree[p] = tree[p*2] + tree[p*2+1]; }

void pushdown(int p, int len) {
    if (lazy[p]) {
        tree[p*2] += lazy[p] * (len - len / 2);
        tree[p*2+1] += lazy[p] * (len / 2);
        lazy[p*2] += lazy[p];
        lazy[p*2+1] += lazy[p];
        lazy[p] = 0;
    }
}

void build(int p, int l, int r) {
    lazy[p] = 0;
    if (l == r) { tree[p] = a[l]; return; }
    int mid = (l + r) / 2;
    build(p*2, l, mid);
    build(p*2+1, mid+1, r);
    pushup(p);
}

void update(int p, int l, int r, int ql, int qr, int v) {
    if (ql <= l && r <= qr) {
        tree[p] += v * (r - l + 1);
        lazy[p] += v;
        return;
    }
    pushdown(p, r - l + 1);
    int mid = (l + r) / 2;
    if (ql <= mid) update(p*2, l, mid, ql, qr, v);
    if (qr > mid)  update(p*2+1, mid+1, r, ql, qr, v);
    pushup(p);
}

long long query(int p, int l, int r, int ql, int qr) {
    if (ql <= l && r <= qr) return tree[p];
    pushdown(p, r - l + 1);
    int mid = (l + r) / 2;
    long long res = 0;
    if (ql <= mid) res += query(p*2, l, mid, ql, qr);
    if (qr > mid)  res += query(p*2+1, mid+1, r, ql, qr);
    return res;
}
```

### 题目描述

<!-- TODO: 添加经典例题 -->

### 解析

<!-- TODO: 添加解析 -->

## 复杂度分析

- 树状数组：修改 $O(\log n)$，查询 $O(\log n)$。
- 线段树：建树 $O(n)$，修改 $O(\log n)$，查询 $O(\log n)$。
