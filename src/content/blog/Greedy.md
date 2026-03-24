---
title: 'Algorithm Review - Greedy'
publishDate: 2026-03-10
description: 'Review of classic greedy strategies including interval scheduling and interval merging.'
tags:
  - Algorithm
  - Review
language: 'en'
series: 'Algorithm Review'
seriesOrder: 6
---

最近要准备华为机试，因此这个专栏为了让我复习一些简单的算法，由于正式机试不能带板子，所以我们需要熟悉常见的板子的写法。

## 区间调度

选择最多的互不重叠区间，经典贪心策略是按右端点排序，每次选择结束最早的区间。

```cpp
struct Interval { int l, r; };
bool cmp(const Interval &a, const Interval &b) { return a.r < b.r; }

int solve(Interval a[], int n) {
    sort(a, a + n, cmp);
    int cnt = 0, last = -1e9;
    for (int i = 0; i < n; i++) {
        if (a[i].l >= last) { cnt++; last = a[i].r; }
    }
    return cnt;
}
```

### 题目描述

<!-- TODO: 添加经典例题 -->

### 解析

<!-- TODO: 添加解析 -->

## 区间合并

将所有重叠的区间合并为一个，按左端点排序后线性扫描即可。

```cpp
sort(a, a + n, [](const Interval &x, const Interval &y) { return x.l < y.l; });
vector<Interval> res;
res.push_back(a[0]);
for (int i = 1; i < n; i++) {
    if (a[i].l <= res.back().r) res.back().r = max(res.back().r, a[i].r);
    else res.push_back(a[i]);
}
```

### 题目描述

<!-- TODO: 添加经典例题 -->

### 解析

<!-- TODO: 添加解析 -->

## 复杂度分析

- 区间调度：排序 $O(n \log n)$，扫描 $O(n)$，总体 $O(n \log n)$。
- 区间合并：同上。
