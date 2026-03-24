---
title: 'Algorithm Review - Manacher and AC Automaton'
publishDate: 2026-03-10
description: 'Review of Manacher''s algorithm for longest palindromic substring and Aho-Corasick automaton for multi-pattern matching.'
tags:
  - Algorithm
  - String
  - Review
language: 'en'
series: 'Algorithm Review'
seriesOrder: 18
---

最近要准备华为机试，因此这个专栏为了让我复习一些简单的算法，由于正式机试不能带板子，所以我们需要熟悉常见的板子的写法。

## Manacher

Manacher 算法在 $O(n)$ 时间内求出以每个位置为中心的最长回文半径。通过插入分隔符统一处理奇偶长度的回文。

```cpp
char t[MAXN * 2];
int p[MAXN * 2];

int manacher(const char *s, int n) {
    int m = 0;
    t[m++] = '$'; t[m++] = '#';
    for (int i = 0; i < n; i++) { t[m++] = s[i]; t[m++] = '#'; }
    t[m++] = '@';

    int c = 0, r = 0, ans = 0;
    for (int i = 1; i < m - 1; i++) {
        p[i] = (i < r) ? min(p[2*c - i], r - i) : 1;
        while (t[i + p[i]] == t[i - p[i]]) p[i]++;
        if (i + p[i] > r) { c = i; r = i + p[i]; }
        ans = max(ans, p[i] - 1);
    }
    return ans; // 最长回文子串长度
}
```

### 题目描述

<!-- TODO: 添加经典例题 -->

### 解析

<!-- TODO: 添加解析 -->

## AC 自动机

AC 自动机是 KMP 在多模式串上的推广，结合了 Trie 树和 fail 指针，可以在文本中同时匹配多个模式串。

```cpp
int ch[MAXN][26], fail[MAXN], val[MAXN], tot = 0;

void insert(const char *s, int id) {
    int u = 0;
    for (int i = 0; s[i]; i++) {
        int c = s[i] - 'a';
        if (!ch[u][c]) ch[u][c] = ++tot;
        u = ch[u][c];
    }
    val[u] = id;
}

void build() {
    queue<int> q;
    for (int c = 0; c < 26; c++)
        if (ch[0][c]) q.push(ch[0][c]);
    while (!q.empty()) {
        int u = q.front(); q.pop();
        for (int c = 0; c < 26; c++) {
            if (ch[u][c]) {
                fail[ch[u][c]] = ch[fail[u]][c];
                q.push(ch[u][c]);
            } else {
                ch[u][c] = ch[fail[u]][c]; // 路径压缩
            }
        }
    }
}

void query(const char *t) {
    int u = 0;
    for (int i = 0; t[i]; i++) {
        u = ch[u][t[i] - 'a'];
        for (int j = u; j; j = fail[j])
            if (val[j]) { /* 模式串 val[j] 在位置 i 匹配 */ }
    }
}
```

### 题目描述

<!-- TODO: 添加经典例题 -->

### 解析

<!-- TODO: 添加解析 -->

## 复杂度分析

- Manacher：$O(n)$。
- AC 自动机：建树 $O(\sum |p_i|)$，匹配 $O(|t| + \text{匹配次数})$。
