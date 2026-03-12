---
title: '算法复习系列 - 搜索与回溯'
publishDate: 2026-03-10
description: '复习 BFS、DFS 与回溯法，掌握网格搜索、全排列、组合等经典问题的写法。'
tags:
  - 算法
  - 复习
language: '中文'
series: '算法复习'
seriesOrder: 7
---

最近要准备华为机试，因此这个专栏为了让我复习一些简单的算法，由于正式机试不能带板子，所以我们需要熟悉常见的板子的写法。

## BFS

BFS 按层扩展，天然适合求最短路（边权为 1 的情况）。以网格最短路为例：

```cpp
int dx[] = {0,0,1,-1}, dy[] = {1,-1,0,0};
int dist[MAXN][MAXN];

void bfs(int sx, int sy) {
    memset(dist, -1, sizeof dist);
    queue<pair<int,int>> q;
    q.push({sx, sy});
    dist[sx][sy] = 0;
    while (!q.empty()) {
        auto [x, y] = q.front(); q.pop();
        for (int d = 0; d < 4; d++) {
            int nx = x + dx[d], ny = y + dy[d];
            if (nx < 0 || nx >= n || ny < 0 || ny >= m) continue;
            if (dist[nx][ny] != -1) continue;
            dist[nx][ny] = dist[x][y] + 1;
            q.push({nx, ny});
        }
    }
}
```

### 题目描述

<!-- TODO: 添加经典例题 -->

### 解析

<!-- TODO: 添加解析 -->

## DFS 回溯 - 全排列

```cpp
int path[MAXN], vis[MAXN];

void dfs(int dep) {
    if (dep == n) {
        for (int i = 0; i < n; i++) cout << path[i] << " ";
        cout << "\n";
        return;
    }
    for (int i = 1; i <= n; i++) {
        if (vis[i]) continue;
        vis[i] = 1; path[dep] = i;
        dfs(dep + 1);
        vis[i] = 0;
    }
}
```

### 题目描述

<!-- TODO: 添加经典例题 -->

### 解析

<!-- TODO: 添加解析 -->

## DFS 回溯 - 组合

```cpp
int chosen[MAXN];

void dfs(int dep, int start) {
    if (dep == k) {
        for (int i = 0; i < k; i++) cout << chosen[i] << " ";
        cout << "\n";
        return;
    }
    for (int i = start; i <= n; i++) {
        chosen[dep] = i;
        dfs(dep + 1, i + 1);
    }
}
```

### 题目描述

<!-- TODO: 添加经典例题 -->

### 解析

<!-- TODO: 添加解析 -->

## 复杂度分析

- BFS：$O(V + E)$，网格上为 $O(nm)$。
- 全排列：$O(n!)$。
- 组合 $C(n,k)$：$O(C_n^k)$。
