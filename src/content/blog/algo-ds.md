---
title: 'Algorithm Miscellany - Data Structures'
publishDate: 2026-03-10
description: 'Algorithm Miscellany series: data structure-related algorithms.'
tags:
  - Algorithm
  - Review
language: 'en'
series: 'Algorithm Miscellany'
seriesOrder: 6
---

## 并查集

```cpp
struct DSU {
    vector<size_t> pa, size;
    explicit DSU(size_t n) : pa(n), size(n, 1) { iota(pa.begin(), pa.end(), 0); }
    size_t find(size_t x) { return pa[x] == x ? x : pa[x] = find(pa[x]); }
    void unite(size_t x, size_t y) {
        x = find(x), y = find(y);
        if (x == y) return;
        if (size[x] < size[y]) swap(x, y);
        pa[y] = x;
        size[x] += size[y];
    }
};
```

### 带删除的并查集

### 带权并查集

## 分块数据结构

## ST 表

**ST** 表是用于解决**可重复贡献问题**的数据结构。

**可重复贡献问题**是指对于运算 opt，满足 $x\ opt\ x = x$，则对应的区间询问就是一个可重复贡献问题。

ST 表基于**倍增**思想，可以做到 $O(n \log n)$ 预处理，$O(1)$ 回答每个询问，但是不支持修改操作。

具体实现如下

令 $f(i, j)$ 表示区间 $[i, i + 2^j - 1]$ 的最大值，显然 $f(i, 0) = a_i$。根据定义式，第二维就相当于倍增的时候"跳了 $2^j - 1$ 步"，根据倍增的思路，写出状态转移方程 $f(i, j) = \max(f(i, j - 1), f(i + 2^{j - 1}, j - 1))$。

以上就是预处理部分。而对于查询，可以简单实现如下

对于每个询问

## 树状数组

树状数组是一种支持**单点修改**和**区间查询**的，代码量最小的数据结构。

普通树状数组维护的信息及运算要满足**结合律**和**可差分**，如加法（和）、乘法（）

- 结合律：
- 可差分：
