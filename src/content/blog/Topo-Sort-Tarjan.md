---
title: '算法复习系列 - 拓扑排序与 Tarjan'
publishDate: 2026-03-10
description: '复习拓扑排序（Kahn 算法）和 Tarjan 算法求强连通分量、割点与桥。'
tags:
  - 算法
  - 图论
  - 复习
language: '中文'
series: '算法复习'
seriesOrder: 15
---

最近要准备华为机试，因此这个专栏为了让我复习一些简单的算法，由于正式机试不能带板子，所以我们需要熟悉常见的板子的写法。

## 拓扑排序（Kahn 算法）

拓扑排序用于 DAG（有向无环图）中确定节点的线性顺序。BFS 实现每次取入度为 0 的节点，同时可以判断是否存在环。

```cpp
int deg[MAXN];
vector<int> adj[MAXN], topo;

bool topoSort() {
    queue<int> q;
    for (int i = 1; i <= n; i++)
        if (deg[i] == 0) q.push(i);
    while (!q.empty()) {
        int u = q.front(); q.pop();
        topo.push_back(u);
        for (int v : adj[u])
            if (--deg[v] == 0) q.push(v);
    }
    return topo.size() == n; // false 表示有环
}
```

### 题目描述

<!-- TODO: 添加经典例题 -->

### 解析

<!-- TODO: 添加解析 -->

## Tarjan 求强连通分量

```cpp
int dfn[MAXN], low[MAXN], timer = 0;
int stk[MAXN], top = 0, inStk[MAXN];
int scc[MAXN], sccCnt = 0;

void tarjan(int u) {
    dfn[u] = low[u] = ++timer;
    stk[++top] = u; inStk[u] = 1;
    for (int v : adj[u]) {
        if (!dfn[v]) {
            tarjan(v);
            low[u] = min(low[u], low[v]);
        } else if (inStk[v]) {
            low[u] = min(low[u], dfn[v]);
        }
    }
    if (dfn[u] == low[u]) {
        sccCnt++;
        while (true) {
            int v = stk[top--];
            inStk[v] = 0;
            scc[v] = sccCnt;
            if (v == u) break;
        }
    }
}
```

### 题目描述

<!-- TODO: 添加经典例题 -->

### 解析

<!-- TODO: 添加解析 -->

## Tarjan 求割点

```cpp
int dfn[MAXN], low[MAXN], timer = 0;
bool cut[MAXN];

void tarjan(int u, int fa) {
    dfn[u] = low[u] = ++timer;
    int child = 0;
    for (int v : adj[u]) {
        if (!dfn[v]) {
            child++;
            tarjan(v, u);
            low[u] = min(low[u], low[v]);
            if (fa == -1 && child > 1) cut[u] = true;       // 根节点
            if (fa != -1 && low[v] >= dfn[u]) cut[u] = true; // 非根
        } else if (v != fa) {
            low[u] = min(low[u], dfn[v]);
        }
    }
}
```

### 题目描述

<!-- TODO: 添加经典例题 -->

### 解析

<!-- TODO: 添加解析 -->

## 复杂度分析

- 拓扑排序：$O(V + E)$。
- Tarjan（强连通分量 / 割点）：$O(V + E)$。
