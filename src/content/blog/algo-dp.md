---
title: 'Algorithm Miscellany - Dynamic Programming'
publishDate: 2026-03-10
description: 'Algorithm Miscellany series: high-dimensional prefix sums, SOSDP, bitwise LCS, longest non-decreasing subsequence, and DP optimization.'
tags:
  - Algorithm
  - Dynamic Programming
  - Review
language: 'en'
series: 'Algorithm Miscellany'
seriesOrder: 3
---

## 高维前缀和

对于一般的情形，给定 $k$ 维数组 $A$，大小为 $N$，同样要求求得其前缀和 $S$，这里，

$$
S_{i_1,\cdots,i_k} = \sum\limits_{ i^{'}_{1} \le i_1}\cdots\sum\limits_{i^{'}_k \le i_k} A_{i_1^{'},\cdots,i_k^{'}}
$$

从上式可以看出，$k$ 维前缀和就等于 $k$ 次求和。所以，一个显然的算法是，每次只考虑一个维度，固定所有其他维度，然后求若干个一维前缀和，这样对所有 $k$ 个维度分别求和之后，得到的就是 $k$ 维前缀和。因为考虑每一个维度的时候，都只遍历了整个数组一遍，这样的算法复杂度是 $O(kN)$ 的，通常可以接受。

### 高维前缀和的拓展 - 子集和 DP (SOSDP)

维度比较大的情形，经常出现在一类叫做**子集和**的问题中，这是高维前缀和的特例。

问题描述如下。考虑大小为 $n$ 的集合的全体子集上面定义的函数 $f$，现在要求出其子集和函数 $g$，它满足

$$
g(S) = \sum\limits_{T\subseteq S}f(T)
$$

即 $g(S)$ 等于其所有子集 $T \subseteq S$ 上的函数值 $f(T)$ 的和。

首先，子集和问题可以写成高维前缀和的形式。注意到，$S$ 的子集可以通过状态压缩的思想表示为长度为 $n$ 的 $0\text{-}1$ 字符串 $s$。将字符串的每一位都看作是数组下标的一个维度，那么 $f$ 其实就是一个 $n$ 维数组，且每个维度下标都一定在 $\{0, 1\}$ 中。同时，子集的包含关系就等价于下标的大小关系，即

$$
T\subseteq S \Leftrightarrow \forall i (t_i \le s_i)
$$

所以，对子集求和，就是求这个 $n$ 维数组的前缀和。

现在，可以直接使用前文所述的逐维前缀和的方法求得子集和。时间复杂度是 $O(n 2^n)$。

## 位运算求最长公共子序列

### 题目

你有两个字符串 $A, B$，字符集为 $\Sigma$，求 $A, B$ 的最长公共子序列。

### 朴素做法

首先有一个广为人知的 $dp$：$f_{i,j}$ 为 $A$ 的长度为 $j$ 的前缀与 $B$ 长度为 $i$ 的前缀的 $LCS$。

那么显然有：

$$
f_{i,j} = \begin{cases}
f_{i - 1, j - 1} + 1 &(A_j = B_i)\\
\max(f_{i, j - 1}, f_{i - 1, j}) & (A_j \neq B_i)
\end{cases}
$$

然而这是 $O(n^2)$ 的，在略大的数据下就很容易 TLE。

### 改进

## 最长不下降子序列 O(n log n) 写法

先来描述一个题目，题目很常见

> 给定一个长度为 $n$ 的序列 $a$，求出一个最长的 $a$ 的子序列，满足该子序列的最后一个元素不小于前一个元素

考虑状态 $(i, l)$，表示序列以第 $i$ 个元素结尾的不下降子序列最长为 $l$，不同于以往按固定 $i$ 处理状态的方法，这里直接判断 $(i, l)$ 是否合法。

- 初始状态 $(1, 1)$ 必然合法
- 对于任意 $(i, l)$，如果存在 $j < i$ 且 $(j, l - 1)$ 合法，同时 $a_j \le a_i$，则 $(i, l)$ 合法

最终，只需要找到合法状态中 $l$ 最大的 $(i, l)$，即可得到最长不下降子序列的长度。

设原序列为 $a_1, \cdots, a_n$，定义数组 $d$，其中第 $x$ 位表示

- 如果 $a_i$ 大于等于序列 $d$ 中
  - 若 $a_i$ 大于等于当前最长子序列的末尾元素，说明存在一个不下降子序列可以接上 $a_i$，不插入将破坏最优性
- 如果 $a_i$ 严格小于 $d$ 的最后一个元素，找到第一个大于它的元素，并用 $a_i$ 替换它
  - 若直接插在末尾，会破坏 $d$ 的单调性，替换操作可以保证每个长度的末尾元素尽可能小，从而为后续元素保留更多可能性

以下是代码实现

```cpp
int n, a[MAXN], d[MAXN], di[MAXN], pre[MAXN], res[MAXN];

int dp() {
    int ans = 0;
    for (int i = 1; i <= n; i++) {
        int tmp = std::upper_bound(d, d + ans, a[i]) - d;
        pre[i] = tmp ? di[tmp - 1] : -1;
        d[tmp] = a[i];
        di[tmp] = i;
        if (tmp == ans) ++ans;
    }
    for (int k = ans, i = di[ans - 1]; k; --k) {
        res[k] = a[i];
        i = pre[i];
    }
    return ans;
}
```

## 区间 DP

令状态$(i, j)$表示将下标位置$i$到$j$的所有元素合并能获得的价值的最大值，那么$f(i, j) = \max\{f(i, k) + f(k + 1, j) + cost\}$，$cost$为将这两组元素合并起来的价值

## 树上背包

## 换根 DP

树形 DP 中的换根 DP 问题又被称为二次扫描，通常不会指定根结点，而且

## 数位 DP

## 插头 DP

## 计数 DP

## 动态 DP
