---
title: 'Algorithm Miscellany - Basics'
publishDate: 2026-03-10
description: 'Algorithm Miscellany series: ternary search, discretization, and other fundamental techniques.'
tags:
  - Algorithm
  - Review
language: 'en'
series: 'Algorithm Miscellany'
seriesOrder: 1
---

最近为了准备保研的机试，开始看 `OI-WIKI` 并且刷题，这个博客主要用来记录我还不熟悉，或者冷门的一些算法和 trick 技巧。

## bitset

### 介绍

`std::bitset` 是标准库中的一个存储 `0/1` 的大小不可变容器。严格来讲，它并不属于 STL。

### 使用

我们可以使用以下代码来指定大小

```cpp
std::bitset<1000> bs; // a bitset with 1000 bits
```

构造函数有以下几种

- `bitset()`：每一位都是 `false`
- `bitset(unsigned long val)`：设为 `val` 的二进制形式
- `bitset(const string& str)`：设为 01 串 `str`

运算符也有以下几种

- `operator[]`：访问其特定的一位
- `operator == / operator !=`：比较两个 `bitset` 内容是否完全一样
- `operator& / operator&= / operator| / operator|= / operator^ / operator^= / operator~`：进行按位与/或/异或/取反操作
- `operator<< / operator>> / operator<<= / operator>>=`：进行二进制左移/右移

此外还有成员函数

- `count()`：返回 `true` 的数量
- `size()`：返回 `bitset` 的大小
- `test(pos)`：它和 `vector` 中的 `at()` 的作用是一样的，和 `[]`
- `any()`：若存在某一位是 `true` 则返回 `true`，否则返回 `false`
- `none()`:若所有位都是`true`则返回`true`，否则返回`false`
- `all()`
  -  
  -  

## 树上前缀和和树上差分

一维前缀和还可以推广到有根树（树根为 1）的情景。通过预处理前缀和，可以快速求解树上一段路径的前缀和。

### 点权的情形

首先考虑权值存储在结点处的情形。设结点 $x$ 处有权值 $a_x$。可以通过递推关系

$$
S_1 = a_1, S_x = S_{fa(x)} + a_x
$$

求出从根节点到结点$x$的路径上结点的权值和，其中，$fa(x)$表示$x$的父节点。预处理完前缀和后，就可以通过

$$
S_x + S_y - 2 * S_{lca(x, y)} + a_{lca(x, y)}
$$

计算连接节点$x$和$y$的路径上的结点权值和。其中，$lca(x, y)$表示

### 边权的情形

权值在边上的情形几乎可以转化为点权的情形。对于所有非根节点$x \neq 1$，记$edge(x)$表示连接结点$x$和它的父结点$fa(x)$的边。那么，可以假设边权存储在离根远的结点上。也就是说


### 子树和

与数组的情形不同，由于树的首尾不对称，所以自下而上和自上而下求前缀和得到的结果并不相通，一般情况下，树上前缀和指的是自上而下计算的前缀和。为方便讨论，本文将自下而上计算的前缀和称为子树和

以结点$x$为根的子树的点权权值和，即相应的子树和，就是

$$
T_x = \sum\limits_{y \in desc(x)}a_x
$$

其中，$desc(x)$表示$x$的所有子孙结点的集合

与树上前缀和不同，子树和并不能应用于$O(1)$求路径权值和，但是它可以用于理解下文的树上差分


同样，差分可以推广到有根树的情形，用于实现树上一段路径的区间加操作。取决于维护的信息存储到结点上还是边上，树上差分可以分为**点差分**和**边差分**，在实现上会稍有不同。另外，相对于树上前缀和操作，更常用的是在所有修改操作后做子树和再查询。

### 点差分

如果要对结点$x$和$y$之间的路径上的所有点权都加$v$，可以对它的差分序列$\{D_x\}$做如下操作

$$
\begin{align*}
D_x&\leftarrow D_x + v,\\
D_{lca(x, y)}&\leftarrow D_{lca(x,y)} - v,\\
D_y &\leftarrow D_y + v,\\
D_{fa(lca(x, y))}&\leftarrow D_{fa(lca(x, y))} - v.
\end{align*}
$$

在所有修改完成后，可以计算一次子树和，就能得到更新后的点权

### 边差分

如果要对结点$x$和$y$之间的路径上的所有边权都加$v$，可以对它的差分序列$\{D_x\}$做如下操作

$$
\begin{align*}
D_x& \leftarrow D_x + v,\\
D_y &\leftarrow D_y + v,\\
D_{lca(x, y)} & \leftarrow D_{lca(x, y)} - 2v
\end{align*}
$$

在所有修改操作完成后，可以计算一次子树和，就能得到更新后的点权

## 三分

二分法可以用于近似求出函数的零点。如果需要求出单峰函数的极值点，通常需要使用三分法。

对于一个函数 $f(x)$，如果存在 $x^*$ 使得 $f(x)$ 在 $x < x^*$ 时单调递增且 $f(x)$ 在 $x > x^*$时单调递减，就称 $f(x)$ 为单峰函数（unimodal function）. 显然，$x^*$ 就是它的最大值点，而 $f(x^*)$则是它的最大值.

三分法与二分法的基本思想类似，但每次操作需在当前区间$[l, r]$内任取两点$lmid < rmind$。如下图所示，如果$f(lmid) < f(rmid)$，则在$[l, lmid)$中函数必然单调递增，最大值点必然不在这一区间内，可舍去这一区间；但是，无法排除最大值点在$rmid$右侧的可能性，所以无法舍去更多区间，反之亦然



三分法的正确性并不依赖于 $lmid$ 和 $rmid$ 的选择，通常可以取两个三分点。但是，它们的选择确实会影响三分法的效率，这是因为三分法的每次操作都会舍去两侧区间的其中一个。为减少三分法的操作次数，应使两侧区间尽可能大。因此，每一次操作的 $lmid$ 和 $rmid$ 分别取 $mid - \varepsilon$ 和 $mid + \varepsilon$ 是一个不错的选择。事实上，$mid \pm \varepsilon$ 的求法相当于求 $mid$ 处的近似导数 $\frac{f(mid + \varepsilon) - f(mid - \varepsilon)}{2\varepsilon}$ 判断正负以确定极值点在 $mid$ 的哪一侧。

正确代码如下

```cpp
auto ternary_search = [&](auto f, double lo, double hi) {
    for (int iter = 0; iter < 200; iter++) {
        double m1 = lo + (hi - lo) / 3;
        double m2 = hi - (hi - lo) / 3;
        if (f(m1) < f(m2))
            lo = m1;
        else
            hi = m2;
    }
    return (lo + hi) / 2;
};
```
## 倍增

**倍增法**，顾名思义就是成倍增长。我们在进行递推时，如果状态空间很大，通常的线性递推无法满足时间和空间复杂度的要求，那么我们可以通过成倍增长的方式，只递推状态空间在$k$的整数次幂位置上的值作为代表。当需要其他位置上的值时，我们通过任意整数可以表示成若干个$k$的次幂项的和这一性质，使用之前求出的代表值拼成所需的值。所以使用倍增算法也要求我们递推的问题的状态空间关于$k$的次幂具有可划分性。通常情况下$k$取$2$
