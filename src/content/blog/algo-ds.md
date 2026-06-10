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

并查集是一种用于管理元素所属集合的数据结构，实现为一个森林，其中每棵树代表一个集合，树中的节点表示对应集合中的元素

顾名思义，并查集支持两种操作:

- 合并:合并两个元素所属集合
- 查询:查询某个元素

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

同时使用

### 带删除的并查集

```cpp
struct DSU {
  size_t id;
  std::vector<size_t> pa, size;

  explicit DSU(size_t size_, size_t m)
      : id(size_ * 2), pa(size_ * 2 + m), size(size_ * 2 + m, 1) {
    // size 的前半段其实没有使用，只是为了让下标计算更简单
    std::iota(pa.begin(), pa.begin() + size_,
              size_);  // 令 i 指向虚点 i + size_
    std::iota(pa.begin() + size_, pa.end(), size_);  // 所有虚点指向它自身
  }

  size_t find(size_t x) { return pa[x] == x ? x : pa[x] = find(pa[x]); }

  void unite(size_t x, size_t y) {
    x = find(x), y = find(y);
    if (x == y) return;
    if (size[x] < size[y]) std::swap(x, y);
    pa[y] = x;
    size[x] += size[y];
  }

  void erase(size_t x) {
    size_t y = find(x);
    --size[y];
    pa[x] = id++;
  }
};

```

### 带权并查集

为了维护并查集中的边权，需要将边权下放到子节点中存储。因此，每个节点存储的都是它到它父节点之间的边权。只有

## 块状数据结构

### 分块思想


分块的基本思想是，通过对原数据的适当划分，并在划分后的每一个块上预处理部分信息，从而较一般的暴力算法取得更优的时间复杂度


#### 区间和

我们将序列按每$s$个元素一块进行分块，并记录每块的区间和$b_i$

$$
\underbrace{a_1, a_2, \ldots, a_s}_{b_1}, \underbrace{a_{s+1}, \ldots, a_{2s}}_{b_2}, \ldots,
  \underbrace{a_{(s-1) \times s + 1}, \ldots, a_n}_{b_{\frac{n}{s}}}
$$

最后一个块可能是不完整的，但是这对于我们的讨论来说并没有太大影响

首先看查询操作:

- 若$l$和$r$在同一个块内，直接暴力求和即可，因为块长为$s$，因此最坏复杂度为$O(s)$

接下来是修改操作


### 块状数组



## ST 表

**ST** 表是用于解决**可重复贡献问题**的数据结构。

**可重复贡献问题**是指对于运算 opt，满足 $x\ opt\ x = x$，则对应的区间询问就是一个可重复贡献问题。

ST 表基于**倍增**思想，可以做到 $O(n \log n)$ 预处理，$O(1)$ 回答每个询问，但是不支持修改操作。

具体实现如下

令 $f(i, j)$ 表示区间 $[i, i + 2^j - 1]$ 的最大值，显然 $f(i, 0) = a_i$。根据定义式，第二维就相当于倍增的时候"跳了 $2^j - 1$ 步"，根据倍增的思路，写出状态转移方程 $f(i, j) = \max(f(i, j - 1), f(i + 2^{j - 1}, j - 1))$。

以上就是预处理部分。而对于查询，可以简单实现如下

对于每个询问$[l, r]$，我们把它分成两部分



```cpp
template<class T, class F = function<T(const T&, const T&)>>
struct SparseTable {
    int n;
    vector<vector<T>> a;
    F f;
    SparseTable(const vector<T>& v, F f) : n(v.size()), f(f) {
        int lg = __lg(n) + 1;
        a.assign(lg, vector<T>(n));
        a[0] = v;
        for (int j = 1; j < lg; j++)
            for (int i = 0; i + (1 << j) <= n; i++)
                a[j][i] = f(a[j-1][i], a[j-1][i + (1 << (j-1))]);
    }
    T query(int l, int r) { // [l, r], 0-indexed
        int k = __lg(r - l + 1);
        return f(a[k][l], a[k][r - (1 << k) + 1]);
    }
};
```

## 树状数组

树状数组是一种支持**单点修改**和**区间查询**的，代码量最小的数据结构。

普通树状数组维护的信息及运算要满足**结合律**和**可差分**，如加法（和）、乘法（）

- 结合律：
- 可差分：



## 线段树

线段树是算法竞赛中常用来维护**区间信息**的数据结构

线段树可以在$O(\log N)$的时间复杂度实现单点修改，区间修改，区间查询等操作

