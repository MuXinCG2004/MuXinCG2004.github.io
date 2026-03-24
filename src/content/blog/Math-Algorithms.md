---
title: 'Algorithm Review - Mathematics'
publishDate: 2026-03-10
description: 'Review of fast exponentiation, Euler sieve, GCD/exGCD, combinatorics, Lucas'' theorem, and matrix exponentiation.'
tags:
  - Algorithm
  - Math
  - Review
language: 'en'
series: 'Algorithm Review'
seriesOrder: 19
---

最近要准备华为机试，因此这个专栏为了让我复习一些简单的算法，由于正式机试不能带板子，所以我们需要熟悉常见的板子的写法。

## 快速幂

利用指数的二进制分解，将 $a^b \mod p$ 的计算从 $O(b)$ 优化到 $O(\log b)$。

```cpp
long long qpow(long long a, long long b, long long mod) {
    long long res = 1; a %= mod;
    while (b > 0) {
        if (b & 1) res = res * a % mod;
        a = a * a % mod;
        b >>= 1;
    }
    return res;
}
```

### 题目描述

<!-- TODO: 添加经典例题 -->

### 解析

<!-- TODO: 添加解析 -->

## 欧拉筛（线性筛）

线性时间内筛出所有素数，每个合数只被其最小质因子筛掉一次。

```cpp
int primes[MAXN], cnt = 0;
bool notPrime[MAXN];

void sieve(int n) {
    for (int i = 2; i <= n; i++) {
        if (!notPrime[i]) primes[cnt++] = i;
        for (int j = 0; j < cnt && (long long)i * primes[j] <= n; j++) {
            notPrime[i * primes[j]] = true;
            if (i % primes[j] == 0) break;
        }
    }
}
```

### 题目描述

<!-- TODO: 添加经典例题 -->

### 解析

<!-- TODO: 添加解析 -->

## GCD 与扩展欧几里得

```cpp
long long gcd(long long a, long long b) { return b ? gcd(b, a % b) : a; }

// 求 ax + by = gcd(a,b) 的一组整数解
long long exgcd(long long a, long long b, long long &x, long long &y) {
    if (!b) { x = 1; y = 0; return a; }
    long long d = exgcd(b, a % b, y, x);
    y -= a / b * x;
    return d;
}
```

### 题目描述

<!-- TODO: 添加经典例题 -->

### 解析

<!-- TODO: 添加解析 -->

## 组合数（预处理阶乘 + 逆元）

```cpp
long long fac[MAXN], ifac[MAXN];

long long inv(long long a, long long mod) { return qpow(a, mod - 2, mod); }

void initC(int n, long long mod) {
    fac[0] = 1;
    for (int i = 1; i <= n; i++) fac[i] = fac[i-1] * i % mod;
    ifac[n] = inv(fac[n], mod);
    for (int i = n - 1; i >= 0; i--) ifac[i] = ifac[i+1] * (i+1) % mod;
}

long long C(int n, int m, long long mod) {
    if (m < 0 || m > n) return 0;
    return fac[n] % mod * ifac[m] % mod * ifac[n-m] % mod;
}
```

### 题目描述

<!-- TODO: 添加经典例题 -->

### 解析

<!-- TODO: 添加解析 -->

## Lucas 定理

当模数 $p$ 为质数且较小时，用于计算大组合数 $C(n, m) \mod p$。

```cpp
long long lucas(long long n, long long m, long long p) {
    if (!m) return 1;
    return C(n % p, m % p, p) * lucas(n / p, m / p, p) % p;
}
```

### 题目描述

<!-- TODO: 添加经典例题 -->

### 解析

<!-- TODO: 添加解析 -->

## 矩阵快速幂

将快速幂推广到矩阵上，常用于加速线性递推（如斐波那契数列）。

```cpp
struct Matrix { long long a[MAXN][MAXN]; int n; };

Matrix mul(Matrix &A, Matrix &B, long long mod) {
    Matrix C; C.n = A.n;
    memset(C.a, 0, sizeof C.a);
    for (int i = 0; i < A.n; i++)
        for (int k = 0; k < A.n; k++) if (A.a[i][k])
            for (int j = 0; j < A.n; j++)
                C.a[i][j] = (C.a[i][j] + A.a[i][k] * B.a[k][j]) % mod;
    return C;
}

Matrix matpow(Matrix A, long long b, long long mod) {
    Matrix res; res.n = A.n;
    memset(res.a, 0, sizeof res.a);
    for (int i = 0; i < A.n; i++) res.a[i][i] = 1;
    while (b > 0) {
        if (b & 1) res = mul(res, A, mod);
        A = mul(A, A, mod);
        b >>= 1;
    }
    return res;
}
```

### 题目描述

<!-- TODO: 添加经典例题 -->

### 解析

<!-- TODO: 添加解析 -->

## 复杂度分析

- 快速幂：$O(\log b)$。
- 欧拉筛：$O(n)$。
- GCD / exGCD：$O(\log \min(a, b))$。
- 组合数预处理：$O(n)$，单次查询 $O(1)$。
- Lucas：$O(p \log_p n)$（含预处理）。
- 矩阵快速幂：$O(k^3 \log b)$，$k$ 为矩阵阶数。
