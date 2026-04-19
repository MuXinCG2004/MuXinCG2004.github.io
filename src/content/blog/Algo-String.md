---
title: 'Algorithm Miscellany - String'
publishDate: 2026-03-10
description: 'Algorithm Miscellany series: string-related algorithms.'
tags:
  - Algorithm
  - Review
language: 'en'
series: 'Algorithm Miscellany'
seriesOrder: 4
---

## 字符串哈希

我们定义一个把字符串映射到整数的函数$f$，这个$f$称为是Hash函数。我们希望这个函数$f$可以方便地帮我们判断两个字符串是否相等

具体来说，哈希函数最重要的性质可以概括为下面两条:

1. 在Hash函数值不一样的时候，两个字符串一定不一样
2. 在Hash函数值一样的时候，两个字符串不一定一样

## 字典树(Trie)

字典树，英文名trie。顾名思义，就是一个像字典一样的树

我们用$\delta(u, c)$表示结点$u$的$c$字符指向的下一个结点，或者说是结点$u$代表的字符串后面添加一个字符串$c$形成的字符串的的结点。

## 前缀函数和KMP算法

### 前缀函数

给定一个长度为$n$则字符串$s$，其**前缀函数**被定义为一个长度为$n$的数组$\pi$。其中$\pi[i]$的定义为

1. 如果子串$s[0\dots i]$有一对相等的真前缀与真后缀:$s[0\dots k - 1]$和$$
2. 如果不止有一对相等的，那么$\pi [i]$就是其中最长的那一对的长度
3. 如果没有相等的，那么$\pi [i] = 0$

简单来说$\pi [i]$就是，

用数学语言描述如下:

$$
\pi [i] = \max\limits_{k = 0\dots i}\{k: s[0\dots k - 1] = s[i - (k - 1) \dots i]\}
$$

特别地，规定$\pi [0] = 0$

根据上述定义，我们可以求得一个计算前缀函数的高效算法

首先我们可以观察到，相邻的前缀函数值至多增加$1$

参照下图所示

### KMP算法

给定一个文本$t$和一个字符串$s$，我们尝试找到并展示$s$在$t$中的所有出现

为了简便起见，我们用$n$