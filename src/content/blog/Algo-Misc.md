---
title: 'Algorithm Miscellany - Miscellaneous'
publishDate: 2026-03-10
description: 'Algorithm Miscellany series: other miscellaneous algorithms and tricks.'
tags:
  - Algorithm
  - Review
language: 'en'
series: 'Algorithm Miscellany'
seriesOrder: 9
---

## 离散化

### 实现

将一个数组离散化，并进行查询是比较常用的应用场景

### 方法一

通常原数组中会有重复的元素，一般把相同的元素离散化为相同的数据

方法如下:

1. 创建原数组的副本
2. 将副本中的值从小到大排序
3. 将排序好的副本去重
4. 查找原数组中的每一个元素在副本中的位置，位置即为排名，将其作为离散化后的值

```cpp
// arr[i]为初始数组，下标范围为[1, n]

for (int i = 1; i <= n; ++i) tmp[i] = arr[i];   // step1
std::sort(tmp + 1, tmp + 1 + n);                // step2
int len = std::unique(tmp + 1, tmp + n + 1) - (tmp + 1) // step3
for (int i = 1; i <= n; i++) arr[i] = std::lower_bound(tmp + 1, tmp + len + 1, arr[i]) - tmp;                       // step4
```

### 方法二

### 复杂度

对于方法一，去重复杂度为$O(n)$，排序复杂度为$O(n \log n)$，最后的$n$次查找复杂度为$O(n \log n)$

对于方法二，排序复杂度为$O(n \log n)$

故两种方法的总时间复杂度都为$O(n \log n)$

空间复杂度为$O(n)$

## 双指针


## 离线算法

### CDQ分治

CDQ分治是一种思想而不是具体的算法，与动态规划类似。目前这个思想的拓展十分广泛，依其原理与写法的不同，大致分为三类:

1. 解决和点对有关的问题
2. 1维动态规划的优化与传递
3. 通过CDQ分治，将一些动态问题转换为静态问题

#### 解决和点对有关的问题

这类问题多数类似于"给定一个长度为$n$的序列，统计一些特性的点对$(i, j)$的数量"或"给定一个长度为$n$的序列，找到一对点$(i, j)使得一些函数的值最大$"

CDQ分治解决这类问题的算法流程如下:

1. 找到这个序列的中点$mid$
2. 将所有点对$(i, j)$划分为三类
  - $1\le i \le mid, 1 \le j \le mid$的点对
  - $1 \le i \le mid, mid + 1\le j \le n$的点对
  - $mid + 1 \le i \le n,mid + 1 \le j \le n$的点对
3. 将$(1, n)$这个序列拆成两个序列$(1, mid)$和$(mid + 1, n)$。此时第一类点对和第三类点对都在这两个序列之中
4. 递归地处理这两类点对
5. 设法处理第二类点对

### CDQ分治优化1D/1D动态规划的转移

## 分数规划

