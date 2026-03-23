---
title: 'Algorithm Review - Monotone Stack and Queue'
publishDate: 2026-03-10
description: '复习单调栈和单调队列的基本写法与经典例题，单调栈解决下一个更大元素问题，单调队列解决滑动窗口最值问题。'
tags:
  - 算法
  - 数据结构
  - 复习
language: '中文'
series: '算法复习'
seriesOrder: 3
---

最近要准备华为机试，因此这个专栏为了让我复习一些简单的算法，由于正式机试不能带板子，所以我们需要熟悉常见的板子的写法。

首先我们来复习单调栈和单调队列，顾名思义，单调栈和单调队列是从栈顶/队首到栈底/队尾都单调不减/不增的一种数据结构，常用于区间问题或者各类优化，实现并不困难，这里展示两个简单的单调栈和单调队列写法，然后根据题目来进行讲解。

## 单调栈

首先是单调栈，单调栈的核心操作就是在入栈前弹出所有破坏单调性的元素，弹出的过程中我们就可以利用栈内的信息来完成各种操作：

```cpp
const int MAXN = 1e5;
int n;           // n为数据总数
int arr[MAXN];   // 假设arr是题目内数据，已经读取好
int st[MAXN], top;

// 这里我们编写一个从栈顶到栈底单调递增的单调栈
void solve() {
    for (int i = 1; i <= n; i++) {
        while (top && arr[i] > arr[st[top]]) top--;
        // 进行各种操作
        st[++top] = i;
    }
}
```

接下来我们根据题目具体分析。

### 题目描述

给出项数为 $n$ 的整数数列 $a_{1 \dots n}$。

定义函数 $f(i)$ 代表数列中第 $i$ 个元素之后第一个大于 $a_i$ 的元素的**下标**，即 $f(i)=\min_{i<j\leq n, a_j > a_i} \{j\}$。若不存在，则 $f(i)=0$。

试求出 $f(1\dots n)$。

### 输入格式

第一行一个正整数 $n$。

第二行 $n$ 个正整数 $a_{1\dots n}$。

### 输出格式

一行 $n$ 个整数表示 $f(1), f(2), \dots, f(n)$ 的值。

### 解析

我们观察题目，对于每个元素我们需要找到它右边第一个比它大的元素，很容易想到使用单调栈。我们建立一个从栈顶到栈底都单调递增的栈，然后反向遍历，这样当我们处理第 $i$ 个元素时，栈里存的都是 $i$ 右边的元素，我们只需要把栈顶比 $a_i$ 小的元素全部弹出，此时栈顶就是第一个大于 $a_i$ 的元素的下标。如果栈为空则说明不存在，输出0。

需要注意的是我们用 `arr[0] = 1e9` 作为哨兵放在栈底，这样就不需要单独判断栈空的情况。

```cpp
#include <bits/stdc++.h>

using namespace std;

const int MAXN = 3e6 + 20;
int n;
int arr[MAXN];
int st[MAXN], top;
stack<int> res;

void solve() {
    cin >> n;
    for (int i = 1; i <= n; i++) cin >> arr[i];
    arr[0] = 1e9;
    for (int i = n; i >= 1; i--) {
        while (arr[i] >= arr[st[top]]) top--;
        res.push(st[top]);
        st[++top] = i;
    }
    while (!res.empty()) {
        cout << res.top() << " ";
        res.pop();
    }
}

int main() {
    solve();
}
```

### 复杂度分析

每个元素最多入栈一次出栈一次，因此整体复杂度为 $O(n)$。

## 单调队列

然后是单调队列，单调队列和单调栈的思想类似，区别在于单调队列是一个双端队列，我们从队尾插入元素并维护单调性，同时从队首弹出过期的元素，因此单调队列非常适合处理滑动窗口类的问题：

```cpp
const int MAXN = 1e5;
int n, k;        // n为数据总数，k为窗口大小
int arr[MAXN];   // 假设arr是题目内数据，已经读取好
int q[MAXN], head, tail;

// 这里我们编写一个从队首到队尾单调递增的单调队列（维护窗口最小值）
void solve() {
    head = 1, tail = 0;
    for (int i = 1; i <= n; i++) {
        while (head <= tail && arr[q[tail]] >= arr[i]) tail--;
        q[++tail] = i;
        if (q[head] < i - k + 1) head++;
        // 当 i >= k 时，arr[q[head]] 即为当前窗口的最小值
    }
}
```

同样我们根据题目具体分析。

### 题目描述

有一个长为 $n$ 的序列 $a$，以及一个大小为 $k$ 的窗口。现在这个窗口从左边开始向右滑动，每次滑动一个单位，求出每次滑动后窗口中的最大值和最小值。

例如数组为 `[1, 3, -1, -3, 5, 3, 6, 7]`，$k = 3$ 时：

| 窗口位置 | 最小值 | 最大值 |
|---|---|---|
| [1 3 -1] -3 5 3 6 7 | -1 | 3 |
| 1 [3 -1 -3] 5 3 6 7 | -3 | 3 |
| 1 3 [-1 -3 5] 3 6 7 | -3 | 5 |
| 1 3 -1 [-3 5 3] 6 7 | -3 | 5 |
| 1 3 -1 -3 [5 3 6] 7 | 3 | 6 |
| 1 3 -1 -3 5 [3 6 7] | 3 | 7 |

### 输入格式

第一行两个正整数 $n$ 和 $k$。

第二行 $n$ 个整数，表示序列 $a$。

### 输出格式

输出两行，第一行为每次窗口滑动后的最小值，第二行为最大值。

### 解析

这是单调队列最经典的应用，我们维护一个双端队列，队列中存储的是元素的下标。以求窗口最小值为例，我们维护一个从队首到队尾单调递增的队列，每次加入新元素时，从队尾弹出所有比当前元素大的元素，因为这些元素既比当前元素大，又比当前元素先过期，所以它们不可能成为任何后续窗口的最小值了。然后检查队首元素是否已经滑出窗口，如果滑出就从队首弹出。此时队首就是当前窗口的最小值。

求最大值同理，只需要把单调性反过来即可。

```cpp
#include <bits/stdc++.h>

using namespace std;

const int MAXN = 1e6 + 10;
int n, k;
int arr[MAXN];
int q[MAXN], head, tail;

void solve() {
    cin >> n >> k;
    for (int i = 1; i <= n; i++) cin >> arr[i];

    // 求窗口最小值
    head = 1, tail = 0;
    for (int i = 1; i <= n; i++) {
        while (head <= tail && arr[q[tail]] >= arr[i]) tail--;
        q[++tail] = i;
        if (q[head] < i - k + 1) head++;
        if (i >= k) cout << arr[q[head]] << " \n"[i == n];
    }

    // 求窗口最大值
    head = 1, tail = 0;
    for (int i = 1; i <= n; i++) {
        while (head <= tail && arr[q[tail]] <= arr[i]) tail--;
        q[++tail] = i;
        if (q[head] < i - k + 1) head++;
        if (i >= k) cout << arr[q[head]] << " \n"[i == n];
    }
}

int main() {
    solve();
}
```

### 复杂度分析

和单调栈一样，每个元素最多入队一次出队一次，因此整体复杂度为 $O(n)$。
