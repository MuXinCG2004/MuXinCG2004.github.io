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

最近为了准备保研的机试，开始看`OI-WIKI`并且刷题，这个博客主要用来记录我还不熟悉，或者冷门的一些算法和trick技巧

## 字符串哈希

我们定义一个把字符串映射到整数的函数$f$，这个$f$称为是Hash函数。我们希望这个函数$f$可以方便地帮我们判断两个字符串是否相等

具体来说，哈希函数最重要的性质可以概括为下面两条:

1. 在Hash函数值不一样的时候，两个字符串一定不一样
2. 在Hash函数值一样的时候，两个字符串不一定一样

## 字典树(Trie)

字典树，英文名trie。顾名思义，就是一个像字典一样的树

我们用$\delta(u, c)$表示结点$u$的$c$字符指向的下一个结点，或者说是结点$u$代表的字符串后面添加一个字符串$c$形成的字符串的的结点。

## 前缀函数和KMP算法

