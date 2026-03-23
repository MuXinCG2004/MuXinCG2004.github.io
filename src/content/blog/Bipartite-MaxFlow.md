---
title: 'Algorithm Review - Bipartite Graphs and Network Flow'
publishDate: 2026-03-10
description: '复习匈牙利算法求二分图最大匹配和 Dinic 算法求最大流。'
tags:
  - 算法
  - 图论
  - 复习
language: '中文'
series: '算法复习'
seriesOrder: 16
---

最近要准备华为机试，因此这个专栏为了让我复习一些简单的算法，由于正式机试不能带板子，所以我们需要熟悉常见的板子的写法。

## 匈牙利算法（二分图最大匹配）

匈牙利算法通过不断寻找增广路来增加匹配数，每次 DFS 寻找一条增广路。

```cpp
int match[MAXN], vis[MAXN];
vector<int> adj[MAXN];

bool dfs(int u) {
    for (int v : adj[u]) {
        if (vis[v]) continue;
        vis[v] = 1;
        if (!match[v] || dfs(match[v])) {
            match[v] = u;
            return true;
        }
    }
    return false;
}

int hungarian() {
    int res = 0;
    memset(match, 0, sizeof match);
    for (int i = 1; i <= n; i++) {
        memset(vis, 0, sizeof vis);
        if (dfs(i)) res++;
    }
    return res;
}
```

### 题目描述

<!-- TODO: 添加经典例题 -->

### 解析

<!-- TODO: 添加解析 -->

## Dinic 最大流

Dinic 算法通过 BFS 分层 + DFS 阻塞流来求最大流，使用当前弧优化提高效率。

```cpp
struct Edge { int to, rev; int cap; };
vector<Edge> graph[MAXN];
int level[MAXN], iter[MAXN];

void addEdge(int u, int v, int cap) {
    graph[u].push_back({v, (int)graph[v].size(), cap});
    graph[v].push_back({u, (int)graph[u].size()-1, 0});
}

bool bfs(int s, int t) {
    memset(level, -1, sizeof level);
    queue<int> q;
    level[s] = 0; q.push(s);
    while (!q.empty()) {
        int u = q.front(); q.pop();
        for (auto &e : graph[u])
            if (e.cap > 0 && level[e.to] < 0) {
                level[e.to] = level[u] + 1;
                q.push(e.to);
            }
    }
    return level[t] >= 0;
}

int dfs(int u, int t, int f) {
    if (u == t) return f;
    for (int &i = iter[u]; i < graph[u].size(); i++) {
        Edge &e = graph[u][i];
        if (e.cap > 0 && level[e.to] == level[u] + 1) {
            int d = dfs(e.to, t, min(f, e.cap));
            if (d > 0) {
                e.cap -= d;
                graph[e.to][e.rev].cap += d;
                return d;
            }
        }
    }
    return 0;
}

int dinic(int s, int t) {
    int flow = 0;
    while (bfs(s, t)) {
        memset(iter, 0, sizeof iter);
        int d;
        while ((d = dfs(s, t, INT_MAX)) > 0) flow += d;
    }
    return flow;
}
```

### 题目描述

<!-- TODO: 添加经典例题 -->

### 解析

<!-- TODO: 添加解析 -->

## 复杂度分析

- 匈牙利算法：$O(VE)$。
- Dinic：$O(V^2 E)$，单位容量网络下为 $O(E\sqrt{V})$。
