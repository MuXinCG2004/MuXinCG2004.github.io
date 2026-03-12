---
title: '算法复习系列 - 双指针与二分'
publishDate: 2026-03-10
description: '复习双指针（尺取法）、二分答案和三分法，掌握区间收缩与单调性搜索的核心技巧。'
tags:
  - 算法
  - 复习
language: '中文'
series: '算法复习'
seriesOrder: 5
---

最近要准备华为机试，因此这个专栏为了让我复习一些简单的算法，由于正式机试不能带板子，所以我们需要熟悉常见的板子的写法。

## 双指针 / 尺取法

双指针维护一个滑动的区间 $[l, r]$，利用单调性避免重复计算，常用于求满足条件的最短/最长子数组。

```cpp
int minLen = INT_MAX;
for (int l = 1, r = 1, sum = 0; r <= n; r++) {
    sum += a[r];
    while (sum >= target) {
        minLen = min(minLen, r - l + 1);
        sum -= a[l++];
    }
}
```

### 题目描述

<!-- TODO: 添加经典例题 -->

### 解析

<!-- TODO: 添加解析 -->

## 二分答案

当答案具有单调性时（即存在一个分界点使得一侧满足条件、另一侧不满足），可以对答案进行二分搜索。

```cpp
int lo = 0, hi = 1e9;
while (lo < hi) {
    int mid = (lo + hi) / 2;
    if (check(mid)) hi = mid;   // 求最小可行解
    else lo = mid + 1;
}
```

### 题目描述

<!-- TODO: 添加经典例题 -->

### 解析

<!-- TODO: 添加解析 -->

## 三分法

三分法用于求单峰/单谷函数的极值点，每次将搜索区间缩小 $1/3$。

```cpp
double lo = L, hi = R;
for (int i = 0; i < 200; i++) {
    double m1 = lo + (hi - lo) / 3;
    double m2 = hi - (hi - lo) / 3;
    if (f(m1) < f(m2)) lo = m1;  // 求极大值
    else hi = m2;
}
```

### 题目描述

<!-- TODO: 添加经典例题 -->

### 解析

<!-- TODO: 添加解析 -->

## 复杂度分析

- 双指针：$O(n)$，每个元素最多被左右指针各访问一次。
- 二分答案：$O(\log C \cdot T_{check})$，$C$ 为值域大小，$T_{check}$ 为验证函数复杂度。
- 三分法：$O(\log C)$ 次迭代，精度取决于迭代次数。
