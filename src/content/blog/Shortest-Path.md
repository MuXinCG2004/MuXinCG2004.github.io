---
title: '算法复习系列 - 最短路'
publishDate: 2026-03-10
description: '复习 Dijkstra、Floyd 和 SPFA 三种最短路算法的写法与适用场景。'
tags:
  - 算法
  - 图论
  - 复习
language: '中文'
series: '算法复习'
seriesOrder: 13
---

最近要准备华为机试，因此这个专栏为了让我复习一些简单的算法，由于正式机试不能带板子，所以我们需要熟悉常见的板子的写法。

## Dijkstra（堆优化）

适用于非负权图的单源最短路，使用优先队列优化后复杂度为 $O((V+E) \log V)$。

```cpp
typedef pair<int,int> pii;
int dist[MAXN], vis[MAXN];
vector<pii> adj[MAXN]; // {to, weight}

void dijkstra(int s) {
    memset(dist, 0x3f, sizeof dist);
    memset(vis, 0, sizeof vis);
    dist[s] = 0;
    priority_queue<pii, vector<pii>, greater<pii>> pq;
    pq.push({0, s});
    while (!pq.empty()) {
        auto [d, u] = pq.top(); pq.pop();
        if (vis[u]) continue;
        vis[u] = 1;
        for (auto [v, w] : adj[u]) {
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                pq.push({dist[v], v});
            }
        }
    }
}
```

### 题目描述

<!-- TODO: 添加经典例题 -->

### 解析

<!-- TODO: 添加解析 -->

## Floyd

全源最短路，适用于点数较小的稠密图，三重循环枚举中转点。

```cpp
int dp[MAXN][MAXN]; // 初始化为邻接矩阵，无边设 INF，dp[i][i] = 0

void floyd() {
    for (int k = 1; k <= n; k++)
        for (int i = 1; i <= n; i++)
            for (int j = 1; j <= n; j++)
                dp[i][j] = min(dp[i][j], dp[i][k] + dp[k][j]);
}
```

### 题目描述

<!-- TODO: 添加经典例题 -->

### 解析

<!-- TODO: 添加解析 -->

## SPFA

可以处理负权边，也可用于判断负环。最坏复杂度为 $O(VE)$，一般情况下较快。

```cpp
int dist[MAXN], cnt[MAXN], inq[MAXN];

bool spfa(int s) {
    memset(dist, 0x3f, sizeof dist);
    memset(cnt, 0, sizeof cnt);
    memset(inq, 0, sizeof inq);
    dist[s] = 0; inq[s] = 1;
    queue<int> q;
    q.push(s);
    while (!q.empty()) {
        int u = q.front(); q.pop();
        inq[u] = 0;
        for (auto [v, w] : adj[u]) {
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                cnt[v] = cnt[u] + 1;
                if (cnt[v] >= n) return false; // 负环
                if (!inq[v]) { q.push(v); inq[v] = 1; }
            }
        }
    }
    return true;
}
```

### 题目描述

<!-- TODO: 添加经典例题 -->

### 解析

<!-- TODO: 添加解析 -->

## 复杂度分析

- Dijkstra（堆优化）：$O((V+E) \log V)$。
- Floyd：$O(V^3)$。
- SPFA：平均 $O(kE)$，最坏 $O(VE)$。
