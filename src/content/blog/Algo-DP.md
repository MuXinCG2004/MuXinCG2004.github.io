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
seriesOrder: 2
---

## 高维前缀和


### 高维前缀和的拓展-子集和DP(SOSDP)


## 位运算求最长公共子序列

## 最长不下降子序列O(n log n)写法

先来描述一个题目，题目很常见

> 给定一个长度为$n$的序列$a$，求出一个最长的$a$的子序列，满足该子序列的最后一个元素不小于前一个元素


考虑状态$(i, l)$，表示序列以地$i$个元素结尾的不下降子序列最长为$l$，不同于以往按固定$i$处理状态的方法，这里直接判断$(i, l)$是否合法

- 初始状态$(1, 1)$必然合法
- 对于任意$(i, l)$，如果存在$j < i$且$(j, l - 1)$合法，，同时$a_j \le a_i$，则$(i , l )$合法

最终，只需要找到合法状态中$l$最大的$(i, l)$，即可得到最长不下降子序列的常务

设原序列为$a_1,\cdots,a_n$，定义数组$d$，其中第$x$位表示

- 如果$a_i$大于等于序列$d$中

- 如果$a_i$严格小于

以下是代码实现

```cpp
int n, a[MAXN], d[MAXN], di[MAXN], pre[MAXN], res[mAXN];

int dp() {
    int ans = 0;
    for (int i = 1; i <= n; i++) {
        int tmp = std::upper_bound(d, d + ans, a[i]) - d;
        pre[i] = tmp ? di[tmp - 1] : -1;
        d[tmp] = a[i]l
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

## DP优化

