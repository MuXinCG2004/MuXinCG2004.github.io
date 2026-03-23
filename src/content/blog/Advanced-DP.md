---
title: 'Algorithm Review - Advanced Dynamic Programming'
publishDate: 2026-03-10
description: '复习区间 DP、树形 DP、数位 DP 和状压 DP 的写法与经典例题。'
tags:
  - 算法
  - 动态规划
  - 复习
language: '中文'
series: '算法复习'
seriesOrder: 9
---

最近要准备华为机试，因此这个专栏为了让我复习一些简单的算法，由于正式机试不能带板子，所以我们需要熟悉常见的板子的写法。

## 区间 DP

区间 DP 按区间长度从小到大枚举，对每个区间枚举分割点。以石子合并为例：

```cpp
int pre[MAXN], dp[MAXN][MAXN];

memset(dp, 0x3f, sizeof dp);
for (int i = 1; i <= n; i++) dp[i][i] = 0;
for (int len = 2; len <= n; len++)
    for (int l = 1; l + len - 1 <= n; l++) {
        int r = l + len - 1;
        for (int k = l; k < r; k++)
            dp[l][r] = min(dp[l][r], dp[l][k] + dp[k+1][r] + pre[r] - pre[l-1]);
    }
```

### 题目描述

<!-- TODO: 添加经典例题 -->

### 解析

<!-- TODO: 添加解析 -->

## 树形 DP

在树结构上进行 DP，通常以 DFS 后序遍历的方式从叶子向根转移。以最大独立集为例：

```cpp
vector<int> adj[MAXN];
int dp[MAXN][2]; // dp[u][0] 不选 u, dp[u][1] 选 u

void dfs(int u, int fa) {
    dp[u][0] = 0; dp[u][1] = val[u];
    for (int v : adj[u]) {
        if (v == fa) continue;
        dfs(v, u);
        dp[u][0] += max(dp[v][0], dp[v][1]);
        dp[u][1] += dp[v][0];
    }
}
```

### 题目描述

<!-- TODO: 添加经典例题 -->

### 解析

<!-- TODO: 添加解析 -->

## 数位 DP

数位 DP 逐位枚举，通过记忆化搜索统计 $[1, n]$ 中满足条件的数的个数。

```cpp
int a[20], dp[20][STATE];

int dfs(int pos, int state, bool limit, bool lead) {
    if (pos < 0) return /* 满足条件返回 1 */;
    if (!limit && !lead && dp[pos][state] != -1) return dp[pos][state];
    int up = limit ? a[pos] : 9;
    int res = 0;
    for (int d = 0; d <= up; d++)
        res += dfs(pos - 1, newState(state, d),
                   limit && d == up, lead && d == 0);
    if (!limit && !lead) dp[pos][state] = res;
    return res;
}

int solve(int n) {
    int len = 0;
    while (n) { a[len++] = n % 10; n /= 10; }
    memset(dp, -1, sizeof dp);
    return dfs(len - 1, 0, true, true);
}
```

### 题目描述

<!-- TODO: 添加经典例题 -->

### 解析

<!-- TODO: 添加解析 -->

## 状压 DP

用二进制表示集合状态，适合 $n$ 较小（$n \leq 20$）的问题。以 TSP 为例：

```cpp
int dp[1 << MAXN][MAXN];

memset(dp, 0x3f, sizeof dp);
dp[1][0] = 0;
for (int S = 1; S < (1 << n); S++)
    for (int u = 0; u < n; u++) {
        if (!(S >> u & 1)) continue;
        for (int v = 0; v < n; v++) {
            if (S >> v & 1) continue;
            dp[S | (1 << v)][v] = min(dp[S | (1 << v)][v], dp[S][u] + dist[u][v]);
        }
    }
// 答案：min(dp[(1<<n)-1][i] + dist[i][0])
```

### 题目描述

<!-- TODO: 添加经典例题 -->

### 解析

<!-- TODO: 添加解析 -->

## 复杂度分析

- 区间 DP：$O(n^3)$。
- 树形 DP：$O(n)$（每个节点访问一次）。
- 数位 DP：$O(\log n \cdot |STATE|)$。
- 状压 DP（TSP）：$O(2^n \cdot n^2)$。
