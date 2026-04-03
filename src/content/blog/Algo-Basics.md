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

最近为了准备保研的机试，开始看`OI-WIKI`并且刷题，这个博客主要用来记录我还不熟悉，或者冷门的一些算法和trick技巧

## bitset

### 介绍

`std::bitset`是标准库中的一个存储`0/1`的大小不可变容器。严格来讲，它并不属于STL

### 使用

我们可以使用以下代码来指定大小

```cpp
std::bitset<1000> bs; // a bitset with 1000 bits
```

构造函数有以下几种

- `bitset()`:每一位都是`false`
- `bitset(unsigned long val)`:设为`val`的二进制形式
- `bitset(const string& str)`:设为01串`str`

运算符也有以下几种

- `operator[]`:访问其特定的一位
- `operator == / operator !=`:比较两个`bitset`内容是否完全一样
- `operator&/operator&=/operator|/operator|= / operator^ / operator ^= /operator~`:进行按位与/或/异或/取反操作
- `operator<< / operator>> / operator<<= / operator>>=`:进行二进制左移/右移

此外还有成员函数

- `count()`:返回`true`的数量
- `size()`:返回`bitset`的大小
- `test(pos)`:它和`vector`中的`at()`的作用是一样的，和`[]`
- `any()`:若存在某一位是`true`则返回`true`,否则返回`false`
- 


## 树上前缀和和树上差分


## 三分

二分法可以用于近似求出函数的零点．如果需要求出单峰函数的极值点，通常需要使用三分法

对于一个函数$f(x)$，如果存在$$

三分法与二分法的基本思想类似

三分法的正确性并不依赖于$lmid$和$rmid$的选择，通常可以取两个三分点。但是，它们的选择确实会影响三分法的效率，这是因为三分法的每次操作都会舍去两侧区间的其中一个。为减少三分法的操作次数，应使两侧区间尽可能大。因此，每一次操作的$lmid$和$rmid$分别取$mid - \varepsilon$和$mid +\varepsilon$是一个不错的选择。事实上，$mid \pm \varepsilon$的求法相当于求$mid$处的近似导数$\frac{f(mid + \varepsilon)- f(mid - \varepsilon)}{2\varepsilon}$判断正负以确定极值点在$mid$的哪一侧

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

## 离散化

