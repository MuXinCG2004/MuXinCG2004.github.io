---
title: 'Algorithm Miscellany - Data Structures'
publishDate: 2026-03-10
description: 'Algorithm Miscellany series: data structure-related algorithms.'
tags:
  - Algorithm
  - Review
language: 'en'
series: 'Algorithm Miscellany'
seriesOrder: 5
---

## 并查集

```cpp
struct DSU {
    vector<size_t> pa, size;
    explicit dsu(size_t size) : pa(size), size(size_t) { iota(pa.begin(), pa.end(), 0); }
    size_t find(size_t x) { return pa[x] == x ? x : pa[x] = find(pa[x]); }
    void unite(size_t x, size_t y) {
        x = find(x), y =find(y);
        if (x == y) continue;
        if (size[x] < size[y]) swap(x, y);
        pa[y] = x;
        size[x] += size[y];
    }
}
```

### 带删除的并查集

### 带权并查集

## 分块数据结构

## ST表