---
title: '算法复习系列 - KMP 与字符串哈希'
publishDate: 2026-03-10
description: '复习 KMP 字符串匹配算法和双哈希字符串匹配的写法。'
tags:
  - 算法
  - 字符串
  - 复习
language: '中文'
series: '算法复习'
seriesOrder: 17
---

最近要准备华为机试，因此这个专栏为了让我复习一些简单的算法，由于正式机试不能带板子，所以我们需要熟悉常见的板子的写法。

## KMP

KMP 算法通过预处理模式串的前缀函数（next 数组），在匹配失败时跳转到最长公共前后缀的位置，避免回溯文本指针。

```cpp
int nxt[MAXN];

void buildNext(const char *p, int m) {
    nxt[0] = 0;
    for (int i = 1, j = 0; i < m; i++) {
        while (j && p[i] != p[j]) j = nxt[j-1];
        if (p[i] == p[j]) j++;
        nxt[i] = j;
    }
}

void kmpSearch(const char *t, int n, const char *p, int m) {
    buildNext(p, m);
    for (int i = 0, j = 0; i < n; i++) {
        while (j && t[i] != p[j]) j = nxt[j-1];
        if (t[i] == p[j]) j++;
        if (j == m) {
            // 匹配位置: i - m + 1
            j = nxt[j-1];
        }
    }
}
```

### 题目描述

<!-- TODO: 添加经典例题 -->

### 解析

<!-- TODO: 添加解析 -->

## 字符串哈希

将字符串映射为整数进行比较，使用双哈希降低冲突概率。可以 $O(1)$ 判断任意子串是否相等。

```cpp
typedef unsigned long long ull;
const ull BASE1 = 131, BASE2 = 13331;
const ull MOD1 = 1e9+7, MOD2 = 1e9+9;
ull h1[MAXN], h2[MAXN], pw1[MAXN], pw2[MAXN];

void buildHash(const char *s, int n) {
    pw1[0] = pw2[0] = 1;
    for (int i = 1; i <= n; i++) {
        pw1[i] = pw1[i-1] * BASE1 % MOD1;
        pw2[i] = pw2[i-1] * BASE2 % MOD2;
    }
    for (int i = 1; i <= n; i++) {
        h1[i] = (h1[i-1] * BASE1 + s[i]) % MOD1;
        h2[i] = (h2[i-1] * BASE2 + s[i]) % MOD2;
    }
}

pair<ull,ull> getHash(int l, int r) {
    ull v1 = (h1[r] - h1[l-1] * pw1[r-l+1] % MOD1 + MOD1) % MOD1;
    ull v2 = (h2[r] - h2[l-1] * pw2[r-l+1] % MOD2 + MOD2) % MOD2;
    return {v1, v2};
}
```

### 题目描述

<!-- TODO: 添加经典例题 -->

### 解析

<!-- TODO: 添加解析 -->

## 复杂度分析

- KMP：预处理 $O(m)$，匹配 $O(n)$，总体 $O(n + m)$。
- 字符串哈希：预处理 $O(n)$，查询子串哈希 $O(1)$。
