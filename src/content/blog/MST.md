---
title: 'Algorithm Review - Minimum Spanning Tree'
publishDate: 2026-03-10
description: 'Review of Kruskal''s and Prim''s algorithms for minimum spanning trees.'
tags:
  - Algorithm
  - Graph Theory
  - Review
language: 'en'
series: 'Algorithm Review'
seriesOrder: 14
---

最近要准备华为机试，因此这个专栏为了让我复习一些简单的算法，由于正式机试不能带板子，所以我们需要熟悉常见的板子的写法。

## Kruskal

基于并查集，将所有边按权值排序后依次加入，适合稀疏图。

```cpp
struct Edge { int u, v, w; };
bool cmp(const Edge &a, const Edge &b) { return a.w < b.w; }

int kruskal(Edge edges[], int m) {
    sort(edges, edges + m, cmp);
    init(n); // 并查集初始化
    int res = 0, cnt = 0;
    for (int i = 0; i < m && cnt < n - 1; i++) {
        int u = edges[i].u, v = edges[i].v;
        if (find(u) != find(v)) {
            unite(u, v);
            res += edges[i].w;
            cnt++;
        }
    }
    return cnt == n - 1 ? res : -1; // -1 表示不连通
}
```

### 题目描述

<!-- TODO: 添加经典例题 -->

### 解析

<!-- TODO: 添加解析 -->

## Prim（堆优化）

类似 Dijkstra 的思想，每次选择距离已选集合最近的点加入，适合稠密图。

```cpp
int prim() {
    memset(dist, 0x3f, sizeof dist);
    memset(vis, 0, sizeof vis);
    dist[1] = 0;
    priority_queue<pii, vector<pii>, greater<pii>> pq;
    pq.push({0, 1});
    int res = 0, cnt = 0;
    while (!pq.empty()) {
        auto [d, u] = pq.top(); pq.pop();
        if (vis[u]) continue;
        vis[u] = 1; res += d; cnt++;
        for (auto [v, w] : adj[u]) {
            if (!vis[v] && w < dist[v]) {
                dist[v] = w;
                pq.push({dist[v], v});
            }
        }
    }
    return cnt == n ? res : -1;
}
```

### 题目描述

<!-- TODO: 添加经典例题 -->

### 解析

<!-- TODO: 添加解析 -->

## 复杂度分析

- Kruskal：$O(E \log E)$（排序主导）。
- Prim（堆优化）：$O((V+E) \log V)$。
