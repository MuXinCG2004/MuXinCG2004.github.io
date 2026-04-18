---
title: 'Algorithm Miscellany - Search'
publishDate: 2026-03-10
description: 'Algorithm Miscellany series: A* search and iterative deepening search algorithms.'
tags:
  - Algorithm
  - Review
language: 'en'
series: 'Algorithm Miscellany'
seriesOrder: 2
---
## A*算法

A*算法的目标是找到有向图上从起点$s$到终点$t$的最短路径。设$d(x,y)$为结点$x$与$y$之间的距离，也就是它们之间最短路径的长度。记$g(x) = d(s, x)$为从起点$s$到结点$x$的距离函数，$h^{*}(x)$为从结点

$$
f(x) = g(x) + h(x)

$$

搜索时，$A^{*}$算法每次从优先队列中取出一个$f$最小的结点。然后，将它的所有后继结点$x$都推入优先队列中，并利用实际记录的$g(x)$和估计的$h(x)$更新$f(x)$

### 性质

由于$h^{*}(x)$的

## 迭代加深搜索
