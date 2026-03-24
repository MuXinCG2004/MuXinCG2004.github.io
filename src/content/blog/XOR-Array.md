---
title: 'XOR Array - Codeforces Solution'
publishDate: 2026-03-03
description: 'Construct a positive integer array where exactly the specified subarrays have XOR value zero, using prefix XOR with unique repetition.'
tags:
  - Algorithm
  - Codeforces
  - Construction
  - Bit Manipulation
language: 'en'
series: 'Codeforces Solutions'
seriesOrder: 4
---

构造长度为 $n$ 的正整数数组，使得恰好只有子数组 $[l, r]$ 的异或值为零，其余所有子数组异或值均非零。本文利用前缀异或与值唯一性的关系给出简洁构造。

## 题目描述

给定三个整数 $n$, $l$, $r$（$2 \le n \le 4 \times 10^5$，$1 \le l < r \le n$）。

需要构造一个长度为 $n$ 的正整数数组 $a$（$1 \le a_i \le 10^9$），定义 $f(x, y) = a_x \oplus a_{x+1} \oplus \cdots \oplus a_y$（其中 $1 \le x \le y \le n$），满足：

$$
f(x, y) = \begin{cases} 0 & \text{if } x = l \text{ and } y = r \\ \neq 0 & \text{otherwise} \end{cases}
$$

即恰好只有子数组 $[l, r]$ 的异或值为零。

## 思路分析

这里着重强调一个异或的性质，异或有结合律交换律且$\forall x, x \opus x$，所以说，异或有着很好的性质，这些性质使异或构成一个阿贝尔群。对于任意阿贝尔群，我们可以使用前缀和这一有效的方法来维护区间运算。因此，我们考虑使用前缀和进行解题

题目要求当$x = l, y = r$时，f(x, y) = 0，也就是说f(x, 0) $\opus$ f(y - 1, 0) = 0，显然这说明f(x, 0) == f(y - 1, 0)

那么我们同理可以推出，$x \ne l \or y \ne r$时，f(x, y) $\ne$ 0 证明$\forall x \ne r, l-1$，f(x, 0)唯一。我们有若干种方式进行构造，这里我们直接选择使用正整数。具体的过程留给代码，需要注意的是，题目要求构造正整数序列，而这样构造方式有可能会产生0，那么我们还有一种构造方式就是当算出来的数为0的时候，将前缀和增1，很容易看出此时算出数不可能为0

## 代码实现

```cpp
// Problem: 1069DIV2
// URL: https://codeforces.com/contest/1069/problem/DIV2
// Tags: B
//    ███╗   ███╗██╗   ██╗██╗  ██╗██╗███╗   ██╗ ██████╗ ██████╗ 
//    ████╗ ████║██║   ██║╚██╗██╔╝██║████╗  ██║██╔════╝██╔════╝ 
//    ██╔████╔██║██║   ██║ ╚███╔╝ ██║██╔██╗ ██║██║     ██║  ███╗
//    ██║╚██╔╝██║██║   ██║ ██╔██╗ ██║██║╚██╗██║██║     ██║   ██║
//    ██║ ╚═╝ ██║╚██████╔╝██╔╝ ██╗██║██║ ╚████║╚██████╗╚██████╔╝
//    ╚═╝     ╚═╝ ╚═════╝ ╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝ ╚═════╝ ╚═════╝ 
//                                                              

#include <bits/stdc++.h>
using namespace std;

const int MAXN = 4e5 +10;
int n, l, r;
int arr[MAXN];
int sum[MAXN];

void solve() {
    cin >> n >> l >> r;
    int index = 1;
    int num;
    for (int i = 1; i <= n; i++, index++) {
        if (i != r) {
            while ((sum[i - 1] ^ index) == 0) index++;
            arr[i] = sum[i - 1] ^ index;
            sum[i] = index;
        }
        if (i == r) {
            arr[i] = sum[l - 1] ^ sum[i - 1];
            sum[i] = sum[l - 1];
        }
        cout << arr[i] << " ";
    }
    cout << '\n';
    
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int T = 1;
    cin >> T;
    while (T--) {
        solve();
    }

    return 0;
}
```

## 复杂度分析

- **时间复杂度：** $O(n)$，单次遍历构造数组。
- **空间复杂度：** $O(1)$，无需额外存储，边算边输出。
