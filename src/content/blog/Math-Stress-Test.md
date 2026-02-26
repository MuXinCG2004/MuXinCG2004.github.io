---
title: '数学公式压力测试 - 渲染性能基准'
publishDate: 2026-02-26
description: '包含大量数学公式的博客文章，用于测试 KaTeX/MathJax 渲染的负载能力与性能表现。'
tags:
  - 数学
  - Test
  - 性能测试
language: '中文'
---

# 数学公式渲染压力测试

本文包含大量数学公式，用于测试页面渲染性能。

---

## 1. 基础代数

行内公式：已知 $a^2 + b^2 = c^2$，若 $a = 3, b = 4$，则 $c = 5$。

$$
ax^2 + bx + c = 0
$$

$$
x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}
$$

$$
x_1 + x_2 = -\frac{b}{a}, \quad x_1 \cdot x_2 = \frac{c}{a}
$$

$$
(a + b)^n = \sum_{k=0}^{n} \binom{n}{k} a^{n-k} b^k
$$

$$
(x + y)^5 = x^5 + 5x^4y + 10x^3y^2 + 10x^2y^3 + 5xy^4 + y^5
$$

$$
a^3 + b^3 = (a+b)(a^2 - ab + b^2)
$$

$$
a^3 - b^3 = (a-b)(a^2 + ab + b^2)
$$

$$
\left(\sum_{i=1}^{n} a_i\right)^2 = \sum_{i=1}^{n} a_i^2 + 2\sum_{1 \leq i < j \leq n} a_i a_j
$$

$$
\prod_{i=1}^{n}(1 + x_i) = 1 + \sum_{i}x_i + \sum_{i<j}x_ix_j + \sum_{i<j<k}x_ix_jx_k + \cdots + x_1x_2\cdots x_n
$$

$$
\sqrt[n]{a_1 a_2 \cdots a_n} \leq \frac{a_1 + a_2 + \cdots + a_n}{n}
$$

---

## 2. 微积分

### 2.1 极限

$$
\lim_{x \to 0} \frac{\sin x}{x} = 1
$$

$$
\lim_{n \to \infty} \left(1 + \frac{1}{n}\right)^n = e
$$

$$
\lim_{x \to 0} \frac{e^x - 1}{x} = 1
$$

$$
\lim_{x \to 0} \frac{\ln(1+x)}{x} = 1
$$

$$
\lim_{x \to 0} \frac{(1+x)^\alpha - 1}{x} = \alpha
$$

$$
\lim_{x \to \infty} \frac{x^n}{e^x} = 0 \quad (n \in \mathbb{N})
$$

$$
\lim_{x \to 0^+} x \ln x = 0
$$

$$
\lim_{n \to \infty} \sqrt[n]{n} = 1
$$

$$
\lim_{n \to \infty} \frac{n!}{n^n e^{-n} \sqrt{2\pi n}} = 1
$$

### 2.2 导数

$$
\frac{d}{dx}\left[x^n\right] = nx^{n-1}
$$

$$
\frac{d}{dx}\left[e^{g(x)}\right] = g'(x) \cdot e^{g(x)}
$$

$$
\frac{d}{dx}\left[\ln|g(x)|\right] = \frac{g'(x)}{g(x)}
$$

$$
\frac{d}{dx}\left[\sin(x)\right] = \cos(x), \quad \frac{d}{dx}\left[\cos(x)\right] = -\sin(x)
$$

$$
\frac{d}{dx}\left[\tan(x)\right] = \sec^2(x), \quad \frac{d}{dx}\left[\cot(x)\right] = -\csc^2(x)
$$

$$
\frac{d}{dx}\left[\arcsin(x)\right] = \frac{1}{\sqrt{1-x^2}}, \quad \frac{d}{dx}\left[\arccos(x)\right] = -\frac{1}{\sqrt{1-x^2}}
$$

$$
\frac{d}{dx}\left[\arctan(x)\right] = \frac{1}{1+x^2}
$$

$$
(f \cdot g)' = f'g + fg'
$$

$$
\left(\frac{f}{g}\right)' = \frac{f'g - fg'}{g^2}
$$

$$
\frac{d}{dx}[f(g(x))] = f'(g(x)) \cdot g'(x)
$$

**莱布尼茨公式：**

$$
(fg)^{(n)} = \sum_{k=0}^{n} \binom{n}{k} f^{(k)} g^{(n-k)}
$$

**隐函数求导：** 若 $F(x, y) = 0$，则

$$
\frac{dy}{dx} = -\frac{F_x}{F_y} = -\frac{\partial F / \partial x}{\partial F / \partial y}
$$

### 2.3 积分

$$
\int x^n \, dx = \frac{x^{n+1}}{n+1} + C \quad (n \neq -1)
$$

$$
\int \frac{1}{x} \, dx = \ln|x| + C
$$

$$
\int e^x \, dx = e^x + C
$$

$$
\int \sin x \, dx = -\cos x + C
$$

$$
\int \cos x \, dx = \sin x + C
$$

$$
\int \sec^2 x \, dx = \tan x + C
$$

$$
\int \frac{dx}{\sqrt{1-x^2}} = \arcsin x + C
$$

$$
\int \frac{dx}{1+x^2} = \arctan x + C
$$

$$
\int \frac{dx}{x^2 + a^2} = \frac{1}{a}\arctan\frac{x}{a} + C
$$

$$
\int \frac{dx}{\sqrt{x^2 \pm a^2}} = \ln\left|x + \sqrt{x^2 \pm a^2}\right| + C
$$

$$
\int_0^{\infty} e^{-x^2} dx = \frac{\sqrt{\pi}}{2}
$$

$$
\int_0^{\pi} \sin^2(x) \, dx = \frac{\pi}{2}
$$

$$
\int_0^{1} \frac{\ln(1+x)}{x} \, dx = \frac{\pi^2}{12}
$$

$$
\int_{-\infty}^{\infty} \frac{1}{\sqrt{2\pi}\sigma} e^{-\frac{(x-\mu)^2}{2\sigma^2}} dx = 1
$$

**分部积分法：**

$$
\int u \, dv = uv - \int v \, du
$$

**Wallis 积分公式：**

$$
\int_0^{\pi/2} \sin^n x \, dx = \int_0^{\pi/2} \cos^n x \, dx = \begin{cases} \dfrac{(n-1)!!}{n!!} \cdot \dfrac{\pi}{2} & n \text{ 为偶数} \\[8pt] \dfrac{(n-1)!!}{n!!} & n \text{ 为奇数} \end{cases}
$$

### 2.4 多重积分

$$
\iint_D f(x,y) \, dA = \int_a^b \int_{g_1(x)}^{g_2(x)} f(x,y) \, dy \, dx
$$

$$
\iiint_E f(x,y,z) \, dV = \int\int\int f(r\sin\phi\cos\theta, \, r\sin\phi\sin\theta, \, r\cos\phi) \, r^2 \sin\phi \, dr \, d\phi \, d\theta
$$

$$
\iint_D r \, dr \, d\theta = \int_0^{2\pi}\int_0^R r \, dr \, d\theta = \pi R^2
$$

**雅可比行列式变换：**

$$
\iint_D f(x,y) \, dx \, dy = \iint_{D'} f(x(u,v), y(u,v)) \left|\frac{\partial(x,y)}{\partial(u,v)}\right| du \, dv
$$

---

## 3. 级数与序列

$$
\sum_{n=1}^{\infty} \frac{1}{n^2} = \frac{\pi^2}{6}
$$

$$
\sum_{n=1}^{\infty} \frac{1}{n^4} = \frac{\pi^4}{90}
$$

$$
\sum_{n=1}^{\infty} \frac{(-1)^{n+1}}{n} = \ln 2
$$

$$
\sum_{n=0}^{\infty} \frac{(-1)^n}{2n+1} = \frac{\pi}{4}
$$

$$
\sum_{n=0}^{\infty} \frac{x^n}{n!} = e^x
$$

$$
\sum_{n=0}^{\infty} (-1)^n \frac{x^{2n+1}}{(2n+1)!} = \sin x
$$

$$
\sum_{n=0}^{\infty} (-1)^n \frac{x^{2n}}{(2n)!} = \cos x
$$

$$
\sum_{n=0}^{\infty} \frac{x^{2n+1}}{2n+1} = \text{arctanh}(x) = \frac{1}{2}\ln\frac{1+x}{1-x}, \quad |x| < 1
$$

$$
\ln(1+x) = \sum_{n=1}^{\infty} \frac{(-1)^{n+1} x^n}{n}, \quad -1 < x \leq 1
$$

$$
\frac{1}{1-x} = \sum_{n=0}^{\infty} x^n, \quad |x| < 1
$$

$$
(1+x)^\alpha = \sum_{n=0}^{\infty} \binom{\alpha}{n} x^n = 1 + \alpha x + \frac{\alpha(\alpha-1)}{2!}x^2 + \frac{\alpha(\alpha-1)(\alpha-2)}{3!}x^3 + \cdots
$$

**Euler 乘积公式：**

$$
\sum_{n=1}^{\infty} \frac{1}{n^s} = \prod_{p \text{ prime}} \frac{1}{1-p^{-s}}, \quad \text{Re}(s) > 1
$$

**Stirling 近似：**

$$
n! \approx \sqrt{2\pi n} \left(\frac{n}{e}\right)^n
$$

**Ramanujan 级数求 $\pi$：**

$$
\frac{1}{\pi} = \frac{2\sqrt{2}}{9801} \sum_{k=0}^{\infty} \frac{(4k)!(1103+26390k)}{(k!)^4 \cdot 396^{4k}}
$$

---

## 4. 线性代数

$$
\mathbf{A} = \begin{pmatrix} a_{11} & a_{12} & \cdots & a_{1n} \\ a_{21} & a_{22} & \cdots & a_{2n} \\ \vdots & \vdots & \ddots & \vdots \\ a_{m1} & a_{m2} & \cdots & a_{mn} \end{pmatrix}
$$

$$
\det(\mathbf{A}) = \sum_{\sigma \in S_n} \text{sgn}(\sigma) \prod_{i=1}^{n} a_{i,\sigma(i)}
$$

$$
\det \begin{pmatrix} a & b \\ c & d \end{pmatrix} = ad - bc
$$

$$
\det \begin{pmatrix} a & b & c \\ d & e & f \\ g & h & i \end{pmatrix} = a(ei-fh) - b(di-fg) + c(dh-eg)
$$

$$
\mathbf{A}^{-1} = \frac{1}{\det(\mathbf{A})} \text{adj}(\mathbf{A})
$$

$$
(\mathbf{AB})^{-1} = \mathbf{B}^{-1}\mathbf{A}^{-1}
$$

$$
(\mathbf{A}^T)^{-1} = (\mathbf{A}^{-1})^T
$$

**特征值方程：**

$$
\mathbf{A}\mathbf{v} = \lambda\mathbf{v} \implies \det(\mathbf{A} - \lambda\mathbf{I}) = 0
$$

$$
\text{tr}(\mathbf{A}) = \sum_{i=1}^{n} a_{ii} = \sum_{i=1}^{n} \lambda_i
$$

$$
\det(\mathbf{A}) = \prod_{i=1}^{n} \lambda_i
$$

**矩阵分解（SVD）：**

$$
\mathbf{A} = \mathbf{U}\mathbf{\Sigma}\mathbf{V}^T
$$

**Cayley-Hamilton 定理：** 若 $p(\lambda) = \det(\lambda \mathbf{I} - \mathbf{A})$ 是 $\mathbf{A}$ 的特征多项式，则

$$
p(\mathbf{A}) = \mathbf{A}^n + c_{n-1}\mathbf{A}^{n-1} + \cdots + c_1\mathbf{A} + c_0\mathbf{I} = \mathbf{0}
$$

**矩阵指数：**

$$
e^{\mathbf{A}} = \sum_{k=0}^{\infty} \frac{\mathbf{A}^k}{k!} = \mathbf{I} + \mathbf{A} + \frac{\mathbf{A}^2}{2!} + \frac{\mathbf{A}^3}{3!} + \cdots
$$

**向量空间内积：**

$$
\langle \mathbf{u}, \mathbf{v} \rangle = \mathbf{u}^T \mathbf{v} = \sum_{i=1}^{n} u_i v_i = \|\mathbf{u}\| \|\mathbf{v}\| \cos\theta
$$

**施密特正交化：**

$$
\mathbf{e}_k = \mathbf{v}_k - \sum_{j=1}^{k-1} \frac{\langle \mathbf{v}_k, \mathbf{e}_j \rangle}{\langle \mathbf{e}_j, \mathbf{e}_j \rangle} \mathbf{e}_j
$$

---

## 5. 概率与统计

$$
P(A \cup B) = P(A) + P(B) - P(A \cap B)
$$

$$
P(A|B) = \frac{P(A \cap B)}{P(B)} = \frac{P(B|A) \cdot P(A)}{P(B)}
$$

**贝叶斯定理（全概率展开）：**

$$
P(A_i | B) = \frac{P(B|A_i)P(A_i)}{\sum_{j=1}^{n} P(B|A_j)P(A_j)}
$$

**二项分布：**

$$
P(X = k) = \binom{n}{k} p^k (1-p)^{n-k}, \quad E[X] = np, \quad \text{Var}(X) = np(1-p)
$$

**泊松分布：**

$$
P(X = k) = \frac{\lambda^k e^{-\lambda}}{k!}, \quad E[X] = \lambda, \quad \text{Var}(X) = \lambda
$$

**正态分布：**

$$
f(x) = \frac{1}{\sigma\sqrt{2\pi}} \exp\left(-\frac{(x-\mu)^2}{2\sigma^2}\right)
$$

$$
\Phi(x) = \frac{1}{\sqrt{2\pi}} \int_{-\infty}^{x} e^{-t^2/2} \, dt
$$

**卡方分布：** 若 $Z_1, \ldots, Z_k$ 独立且 $Z_i \sim N(0,1)$，则

$$
Q = \sum_{i=1}^{k} Z_i^2 \sim \chi^2(k)
$$

**矩母函数：**

$$
M_X(t) = E[e^{tX}] = \int_{-\infty}^{\infty} e^{tx} f(x) \, dx
$$

**中心极限定理：** 若 $X_1, X_2, \ldots, X_n$ 独立同分布，则

$$
\frac{\bar{X}_n - \mu}{\sigma / \sqrt{n}} \xrightarrow{d} N(0, 1) \quad \text{as } n \to \infty
$$

**大数定律：**

$$
\bar{X}_n = \frac{1}{n}\sum_{i=1}^{n} X_i \xrightarrow{P} \mu \quad \text{as } n \to \infty
$$

**信息熵：**

$$
H(X) = -\sum_{i=1}^{n} p_i \log_2 p_i
$$

**KL 散度：**

$$
D_{\text{KL}}(P \| Q) = \sum_{x} P(x) \ln \frac{P(x)}{Q(x)} = \int_{-\infty}^{\infty} p(x) \ln \frac{p(x)}{q(x)} \, dx
$$

**Fisher 信息：**

$$
I(\theta) = E\left[\left(\frac{\partial}{\partial \theta} \ln f(X;\theta)\right)^2\right] = -E\left[\frac{\partial^2}{\partial \theta^2} \ln f(X;\theta)\right]
$$

---

## 6. 微分方程

**一阶线性 ODE：**

$$
\frac{dy}{dx} + P(x)y = Q(x)
$$

$$
y = e^{-\int P \, dx}\left(\int Q \cdot e^{\int P \, dx} \, dx + C\right)
$$

**二阶常系数齐次 ODE：**

$$
ay'' + by' + cy = 0 \implies ar^2 + br + c = 0
$$

$$
y = \begin{cases} C_1 e^{r_1 x} + C_2 e^{r_2 x} & \Delta > 0 \\ (C_1 + C_2 x) e^{r x} & \Delta = 0 \\ e^{\alpha x}(C_1\cos\beta x + C_2\sin\beta x) & \Delta < 0 \end{cases}
$$

**热方程：**

$$
\frac{\partial u}{\partial t} = \alpha \nabla^2 u = \alpha \left(\frac{\partial^2 u}{\partial x^2} + \frac{\partial^2 u}{\partial y^2} + \frac{\partial^2 u}{\partial z^2}\right)
$$

**波动方程：**

$$
\frac{\partial^2 u}{\partial t^2} = c^2 \nabla^2 u
$$

**薛定谔方程：**

$$
i\hbar\frac{\partial}{\partial t}\Psi(\mathbf{r},t) = \left[-\frac{\hbar^2}{2m}\nabla^2 + V(\mathbf{r},t)\right]\Psi(\mathbf{r},t)
$$

**Navier-Stokes 方程：**

$$
\rho\left(\frac{\partial \mathbf{v}}{\partial t} + (\mathbf{v} \cdot \nabla)\mathbf{v}\right) = -\nabla p + \mu\nabla^2\mathbf{v} + \mathbf{f}
$$

**Laplace 方程：**

$$
\nabla^2 \phi = \frac{\partial^2 \phi}{\partial x^2} + \frac{\partial^2 \phi}{\partial y^2} + \frac{\partial^2 \phi}{\partial z^2} = 0
$$

---

## 7. 向量分析与场论

$$
\nabla f = \frac{\partial f}{\partial x}\mathbf{i} + \frac{\partial f}{\partial y}\mathbf{j} + \frac{\partial f}{\partial z}\mathbf{k}
$$

$$
\nabla \cdot \mathbf{F} = \frac{\partial F_x}{\partial x} + \frac{\partial F_y}{\partial y} + \frac{\partial F_z}{\partial z}
$$

$$
\nabla \times \mathbf{F} = \begin{vmatrix} \mathbf{i} & \mathbf{j} & \mathbf{k} \\ \frac{\partial}{\partial x} & \frac{\partial}{\partial y} & \frac{\partial}{\partial z} \\ F_x & F_y & F_z \end{vmatrix}
$$

**Gauss 散度定理：**

$$
\iiint_V (\nabla \cdot \mathbf{F}) \, dV = \oiint_S \mathbf{F} \cdot d\mathbf{S}
$$

**Stokes 定理：**

$$
\iint_S (\nabla \times \mathbf{F}) \cdot d\mathbf{S} = \oint_C \mathbf{F} \cdot d\mathbf{r}
$$

**Green 定理：**

$$
\oint_C (P \, dx + Q \, dy) = \iint_D \left(\frac{\partial Q}{\partial x} - \frac{\partial P}{\partial y}\right) dA
$$

$$
\nabla \times (\nabla f) = \mathbf{0}
$$

$$
\nabla \cdot (\nabla \times \mathbf{F}) = 0
$$

$$
\nabla^2 \mathbf{F} = \nabla(\nabla \cdot \mathbf{F}) - \nabla \times (\nabla \times \mathbf{F})
$$

---

## 8. 复分析

**欧拉公式：**

$$
e^{i\theta} = \cos\theta + i\sin\theta
$$

$$
e^{i\pi} + 1 = 0
$$

**Cauchy 积分公式：**

$$
f(z_0) = \frac{1}{2\pi i} \oint_C \frac{f(z)}{z - z_0} \, dz
$$

$$
f^{(n)}(z_0) = \frac{n!}{2\pi i} \oint_C \frac{f(z)}{(z-z_0)^{n+1}} \, dz
$$

**Laurent 级数：**

$$
f(z) = \sum_{n=-\infty}^{\infty} a_n (z - z_0)^n = \cdots + \frac{a_{-2}}{(z-z_0)^2} + \frac{a_{-1}}{z-z_0} + a_0 + a_1(z-z_0) + \cdots
$$

**留数定理：**

$$
\oint_C f(z) \, dz = 2\pi i \sum_{k=1}^{n} \text{Res}(f, z_k)
$$

**Cauchy-Riemann 方程：** 若 $f(z) = u(x,y) + iv(x,y)$ 解析，则

$$
\frac{\partial u}{\partial x} = \frac{\partial v}{\partial y}, \quad \frac{\partial u}{\partial y} = -\frac{\partial v}{\partial x}
$$

**解析函数的 Liouville 定理：** 若 $f$ 是有界整函数，则 $f$ 为常数。

**最大模原理：** 若 $f$ 在区域 $D$ 上解析且非常数，则 $|f(z)|$ 在 $D$ 内无最大值。

---

## 9. 数论

**费马小定理：**

$$
a^{p-1} \equiv 1 \pmod{p} \quad (p \text{ 为素数}, \gcd(a,p) = 1)
$$

**欧拉定理：**

$$
a^{\varphi(n)} \equiv 1 \pmod{n} \quad (\gcd(a,n) = 1)
$$

**欧拉函数：**

$$
\varphi(n) = n \prod_{p | n} \left(1 - \frac{1}{p}\right)
$$

**Wilson 定理：**

$$
(p-1)! \equiv -1 \pmod{p} \quad (p \text{ 为素数})
$$

**二次互反律：** 对奇素数 $p \neq q$，

$$
\left(\frac{p}{q}\right)\left(\frac{q}{p}\right) = (-1)^{\frac{p-1}{2} \cdot \frac{q-1}{2}}
$$

**素数定理：**

$$
\pi(x) \sim \frac{x}{\ln x} \quad (x \to \infty)
$$

**Riemann Zeta 函数：**

$$
\zeta(s) = \sum_{n=1}^{\infty} \frac{1}{n^s} = \prod_{p \text{ prime}} \frac{1}{1-p^{-s}}, \quad \text{Re}(s) > 1
$$

**Riemann 猜想：** $\zeta(s) = 0$ 的所有非平凡零点满足

$$
\text{Re}(s) = \frac{1}{2}
$$

**Möbius 函数与反演：**

$$
g(n) = \sum_{d|n} f(d) \implies f(n) = \sum_{d|n} \mu\left(\frac{n}{d}\right) g(d)
$$

---

## 10. 抽象代数

**群的定义：** $(G, \cdot)$ 满足封闭性、结合律、单位元、逆元。

**Lagrange 定理：** 若 $H \leq G$，则

$$
|G| = [G:H] \cdot |H|
$$

**群同态基本定理：** 若 $\phi: G \to H$ 是群同态，则

$$
G / \ker(\phi) \cong \text{Im}(\phi)
$$

**有限交换群基本定理：**

$$
G \cong \mathbb{Z}_{n_1} \times \mathbb{Z}_{n_2} \times \cdots \times \mathbb{Z}_{n_k}
$$

**环的理想与商环：** 若 $I \trianglelefteq R$，则

$$
R/I = \{r + I : r \in R\}
$$

**域扩张：** $[\mathbb{Q}(\sqrt{2}, \sqrt{3}) : \mathbb{Q}] = 4$

$$
\text{Gal}(\mathbb{Q}(\sqrt{2}, \sqrt{3}) / \mathbb{Q}) \cong \mathbb{Z}_2 \times \mathbb{Z}_2
$$

---

## 11. 拓扑学

**欧拉示性数：**

$$
\chi = V - E + F = 2 \quad (\text{凸多面体})
$$

**Gauss-Bonnet 定理：**

$$
\int_M K \, dA + \int_{\partial M} k_g \, ds = 2\pi\chi(M)
$$

**Betti 数与同调群：**

$$
\chi(M) = \sum_{k=0}^{n} (-1)^k b_k = \sum_{k=0}^{n} (-1)^k \text{rank}(H_k(M))
$$

**基本群：**

$$
\pi_1(S^1) \cong \mathbb{Z}, \quad \pi_1(T^2) \cong \mathbb{Z} \times \mathbb{Z}, \quad \pi_1(S^n) = 0 \; (n \geq 2)
$$

**纤维丛序列：**

$$
\cdots \to \pi_n(F) \to \pi_n(E) \to \pi_n(B) \to \pi_{n-1}(F) \to \cdots
$$

---

## 12. 傅里叶分析

$$
f(x) = \frac{a_0}{2} + \sum_{n=1}^{\infty} \left(a_n \cos\frac{n\pi x}{L} + b_n \sin\frac{n\pi x}{L}\right)
$$

$$
a_n = \frac{1}{L}\int_{-L}^{L} f(x)\cos\frac{n\pi x}{L} \, dx
$$

$$
b_n = \frac{1}{L}\int_{-L}^{L} f(x)\sin\frac{n\pi x}{L} \, dx
$$

**傅里叶变换：**

$$
\hat{f}(\xi) = \mathcal{F}\{f\}(\xi) = \int_{-\infty}^{\infty} f(x) e^{-2\pi i x \xi} \, dx
$$

**傅里叶逆变换：**

$$
f(x) = \mathcal{F}^{-1}\{\hat{f}\}(x) = \int_{-\infty}^{\infty} \hat{f}(\xi) e^{2\pi i x \xi} \, d\xi
$$

**卷积定理：**

$$
\mathcal{F}\{f * g\} = \mathcal{F}\{f\} \cdot \mathcal{F}\{g\}
$$

**Parseval 定理：**

$$
\int_{-\infty}^{\infty} |f(x)|^2 \, dx = \int_{-\infty}^{\infty} |\hat{f}(\xi)|^2 \, d\xi
$$

**不确定性原理：**

$$
\Delta x \cdot \Delta \xi \geq \frac{1}{4\pi}
$$

**离散傅里叶变换 (DFT)：**

$$
X_k = \sum_{n=0}^{N-1} x_n \cdot e^{-i 2\pi kn/N}, \quad k = 0, 1, \ldots, N-1
$$

---

## 13. 微分几何

**第一基本形式：**

$$
ds^2 = E \, du^2 + 2F \, du \, dv + G \, dv^2
$$

**Gauss 曲率：**

$$
K = \frac{LN - M^2}{EG - F^2}
$$

**测地线方程：**

$$
\frac{d^2 x^\mu}{ds^2} + \Gamma^\mu_{\alpha\beta} \frac{dx^\alpha}{ds}\frac{dx^\beta}{ds} = 0
$$

**Christoffel 符号：**

$$
\Gamma^\lambda_{\mu\nu} = \frac{1}{2} g^{\lambda\rho}\left(\frac{\partial g_{\rho\mu}}{\partial x^\nu} + \frac{\partial g_{\rho\nu}}{\partial x^\mu} - \frac{\partial g_{\mu\nu}}{\partial x^\rho}\right)
$$

**Riemann 曲率张量：**

$$
R^\rho_{\ \sigma\mu\nu} = \partial_\mu\Gamma^\rho_{\nu\sigma} - \partial_\nu\Gamma^\rho_{\mu\sigma} + \Gamma^\rho_{\mu\lambda}\Gamma^\lambda_{\nu\sigma} - \Gamma^\rho_{\nu\lambda}\Gamma^\lambda_{\mu\sigma}
$$

**Einstein 场方程：**

$$
R_{\mu\nu} - \frac{1}{2}Rg_{\mu\nu} + \Lambda g_{\mu\nu} = \frac{8\pi G}{c^4} T_{\mu\nu}
$$

---

## 14. 泛函分析

**Banach 不动点定理：** 若 $T: X \to X$ 是完备度量空间上的压缩映射，则存在唯一不动点 $x^*$ 使得

$$
T(x^*) = x^*, \quad x^* = \lim_{n\to\infty} T^n(x_0)
$$

**Riesz 表示定理：** 对 Hilbert 空间 $H$ 上的有界线性泛函 $\phi$，存在唯一的 $y \in H$ 使得

$$
\phi(x) = \langle x, y \rangle \quad \forall x \in H
$$

**谱定理：** 对自伴算子 $A$，

$$
A = \int_{\sigma(A)} \lambda \, dE_\lambda
$$

**Schwartz 空间上的 Sobolev 不等式：**

$$
\|u\|_{L^{p^*}(\mathbb{R}^n)} \leq C \|\nabla u\|_{L^p(\mathbb{R}^n)}, \quad p^* = \frac{np}{n-p}, \quad 1 \leq p < n
$$

---

## 15. 物理公式大杂烩

**Maxwell 方程组（微分形式）：**

$$
\nabla \cdot \mathbf{E} = \frac{\rho}{\varepsilon_0}
$$

$$
\nabla \cdot \mathbf{B} = 0
$$

$$
\nabla \times \mathbf{E} = -\frac{\partial \mathbf{B}}{\partial t}
$$

$$
\nabla \times \mathbf{B} = \mu_0 \mathbf{J} + \mu_0\varepsilon_0\frac{\partial \mathbf{E}}{\partial t}
$$

**狭义相对论：**

$$
E = mc^2, \quad E^2 = (pc)^2 + (mc^2)^2
$$

$$
ds^2 = -c^2 dt^2 + dx^2 + dy^2 + dz^2
$$

$$
\gamma = \frac{1}{\sqrt{1 - v^2/c^2}}
$$

**Dirac 方程：**

$$
(i\gamma^\mu \partial_\mu - m)\psi = 0
$$

**路径积分：**

$$
\langle x_f | e^{-iHt/\hbar} | x_i \rangle = \int \mathcal{D}[x(t)] \, e^{iS[x(t)]/\hbar}
$$

其中作用量

$$
S[x(t)] = \int_0^T \left(\frac{1}{2}m\dot{x}^2 - V(x)\right) dt
$$

**配分函数：**

$$
Z = \sum_i e^{-\beta E_i} = \text{tr}(e^{-\beta H}), \quad \beta = \frac{1}{k_B T}
$$

$$
F = -k_B T \ln Z, \quad \langle E \rangle = -\frac{\partial \ln Z}{\partial \beta}
$$

**黑体辐射 (Planck)：**

$$
B(\nu, T) = \frac{2h\nu^3}{c^2} \cdot \frac{1}{e^{h\nu/k_BT} - 1}
$$

---

## 16. 信息论与编码

**Shannon 信道容量：**

$$
C = \max_{p(x)} I(X;Y) = \max_{p(x)} \left[H(Y) - H(Y|X)\right]
$$

**AWGN 信道：**

$$
C = B \log_2\left(1 + \frac{S}{N}\right) \text{ bits/s}
$$

**互信息：**

$$
I(X;Y) = \sum_{x,y} p(x,y) \log\frac{p(x,y)}{p(x)p(y)} = H(X) - H(X|Y) = H(Y) - H(Y|X)
$$

**率失真函数：**

$$
R(D) = \min_{p(\hat{x}|x): E[d(X,\hat{X})] \leq D} I(X;\hat{X})
$$

---

## 17. 机器学习核心公式

**梯度下降：**

$$
\theta_{t+1} = \theta_t - \eta \nabla_\theta \mathcal{L}(\theta_t)
$$

**Adam 优化器：**

$$
m_t = \beta_1 m_{t-1} + (1-\beta_1)g_t, \quad v_t = \beta_2 v_{t-1} + (1-\beta_2)g_t^2
$$

$$
\hat{m}_t = \frac{m_t}{1-\beta_1^t}, \quad \hat{v}_t = \frac{v_t}{1-\beta_2^t}
$$

$$
\theta_{t+1} = \theta_t - \frac{\eta}{\sqrt{\hat{v}_t} + \epsilon} \hat{m}_t
$$

**交叉熵损失：**

$$
\mathcal{L} = -\sum_{i=1}^{C} y_i \log(\hat{y}_i) = -\log(\hat{y}_c) \quad (\text{one-hot 标签下})
$$

**Softmax：**

$$
\hat{y}_i = \frac{e^{z_i}}{\sum_{j=1}^{C} e^{z_j}}
$$

**反向传播（链式法则）：**

$$
\frac{\partial \mathcal{L}}{\partial w_{ij}^{(l)}} = \frac{\partial \mathcal{L}}{\partial a_j^{(l)}} \cdot \frac{\partial a_j^{(l)}}{\partial z_j^{(l)}} \cdot \frac{\partial z_j^{(l)}}{\partial w_{ij}^{(l)}}
$$

**Attention 机制（Transformer）：**

$$
\text{Attention}(Q, K, V) = \text{softmax}\left(\frac{QK^T}{\sqrt{d_k}}\right) V
$$

**Multi-Head Attention：**

$$
\text{MultiHead}(Q,K,V) = \text{Concat}(\text{head}_1, \ldots, \text{head}_h) W^O
$$

$$
\text{where } \text{head}_i = \text{Attention}(QW_i^Q, KW_i^K, VW_i^V)
$$

**VAE 损失 (ELBO)：**

$$
\mathcal{L}_{\text{VAE}} = \mathbb{E}_{q(z|x)}[\log p(x|z)] - D_{\text{KL}}(q(z|x) \| p(z))
$$

**GAN 目标函数：**

$$
\min_G \max_D \, \mathbb{E}_{x \sim p_{\text{data}}}[\log D(x)] + \mathbb{E}_{z \sim p_z}[\log(1 - D(G(z)))]
$$

**贝叶斯优化（高斯过程回归）：**

$$
f(\mathbf{x}_*) | \mathbf{X}, \mathbf{y}, \mathbf{x}_* \sim \mathcal{N}\left(\mathbf{k}_*^T (\mathbf{K} + \sigma_n^2 \mathbf{I})^{-1}\mathbf{y}, \; k_{**} - \mathbf{k}_*^T(\mathbf{K}+\sigma_n^2\mathbf{I})^{-1}\mathbf{k}_*\right)
$$

---

## 18. 组合数学

$$
\binom{n}{k} = \frac{n!}{k!(n-k)!}
$$

$$
\binom{n}{k} = \binom{n-1}{k-1} + \binom{n-1}{k}
$$

$$
\sum_{k=0}^{n} \binom{n}{k} = 2^n
$$

$$
\sum_{k=0}^{n} (-1)^k \binom{n}{k} = 0
$$

**Vandermonde 恒等式：**

$$
\binom{m+n}{r} = \sum_{k=0}^{r} \binom{m}{k}\binom{n}{r-k}
$$

**容斥原理：**

$$
\left|\bigcup_{i=1}^{n} A_i\right| = \sum_{i} |A_i| - \sum_{i<j} |A_i \cap A_j| + \sum_{i<j<k} |A_i \cap A_j \cap A_k| - \cdots + (-1)^{n+1} |A_1 \cap \cdots \cap A_n|
$$

**Catalan 数：**

$$
C_n = \frac{1}{n+1}\binom{2n}{n} = \frac{(2n)!}{(n+1)!n!}
$$

**Bell 数（集合划分数）：**

$$
B_{n+1} = \sum_{k=0}^{n} \binom{n}{k} B_k
$$

**Stirling 数（第二类）：**

$$
S(n,k) = \frac{1}{k!}\sum_{j=0}^{k} (-1)^{k-j}\binom{k}{j} j^n
$$

**生成函数：**

$$
F(x) = \sum_{n=0}^{\infty} a_n x^n, \quad \hat{F}(x) = \sum_{n=0}^{\infty} a_n \frac{x^n}{n!}
$$

---

## 19. 最优化理论

**KKT 条件：** 对约束优化 $\min f(x)$ s.t. $g_i(x) \leq 0, h_j(x) = 0$

$$
\nabla f(x^*) + \sum_i \mu_i \nabla g_i(x^*) + \sum_j \lambda_j \nabla h_j(x^*) = 0
$$

$$
\mu_i \geq 0, \quad \mu_i g_i(x^*) = 0, \quad g_i(x^*) \leq 0, \quad h_j(x^*) = 0
$$

**对偶问题：**

$$
\max_{\mu \geq 0, \lambda} \min_x \mathcal{L}(x, \mu, \lambda) = \max_{\mu \geq 0, \lambda} \min_x \left[f(x) + \sum_i \mu_i g_i(x) + \sum_j \lambda_j h_j(x)\right]
$$

**凸函数 Jensen 不等式：**

$$
f\left(\sum_{i=1}^{n} \lambda_i x_i\right) \leq \sum_{i=1}^{n} \lambda_i f(x_i), \quad \lambda_i \geq 0, \quad \sum \lambda_i = 1
$$

---

## 20. 超长公式终极测试

**Jacobi theta 函数恒等式：**

$$
\sum_{n=-\infty}^{\infty} q^{n^2} = \prod_{m=1}^{\infty} (1-q^{2m})(1+q^{2m-1})^2
$$

**Selberg 积分：**

$$
S_n(\alpha, \beta, \gamma) = \int_0^1 \cdots \int_0^1 \prod_{i=1}^{n} t_i^{\alpha-1}(1-t_i)^{\beta-1} \prod_{1 \leq i < j \leq n} |t_i - t_j|^{2\gamma} \, dt_1 \cdots dt_n = \prod_{j=0}^{n-1} \frac{\Gamma(\alpha+j\gamma)\Gamma(\beta+j\gamma)\Gamma(1+(j+1)\gamma)}{\Gamma(\alpha+\beta+(n-1+j)\gamma)\Gamma(1+\gamma)}
$$

**Yang-Baxter 方程：**

$$
R_{12}(u)R_{13}(u+v)R_{23}(v) = R_{23}(v)R_{13}(u+v)R_{12}(u)
$$

**Witten-Kontsevich 定理（模空间上的交叉数）：**

$$
\left\langle \tau_{d_1} \cdots \tau_{d_n} \right\rangle = \frac{(2g-2+n)!}{\prod_{i=1}^n (2d_i+1)!!} \cdot [\text{coefficient extraction from KdV hierarchy}]
$$

**Atiyah-Singer 指标定理：**

$$
\text{ind}(D) = \int_M \text{ch}(E) \cdot \text{Td}(TM \otimes \mathbb{C})
$$

其中 $\text{ch}(E)$ 为 Chern 特征，$\text{Td}$ 为 Todd 类。

**超弦理论的 Polyakov 作用量：**

$$
S_P = -\frac{T}{2}\int d^2\sigma \sqrt{-h} \, h^{\alpha\beta} \partial_\alpha X^\mu \partial_\beta X^\nu G_{\mu\nu}(X)
$$

**Witten 型拓扑场论配分函数：**

$$
Z = \int \mathcal{D}[\phi] \mathcal{D}[\psi] \mathcal{D}[\bar{\psi}] \mathcal{D}[A] \, \exp\left(-\frac{1}{g^2}\int_M \text{tr}\left(\frac{1}{4}F_{\mu\nu}F^{\mu\nu} + \frac{1}{2}D_\mu\phi D^\mu\phi + i\bar{\psi}\gamma^\mu D_\mu \psi + \cdots\right) d^4x\right)
$$

---

> 本文共包含约 **300+ 个数学公式**，覆盖代数、微积分、级数、线性代数、概率统计、微分方程、向量分析、复分析、数论、抽象代数、拓扑学、傅里叶分析、微分几何、泛函分析、物理、信息论、机器学习、组合数学、最优化理论等领域。如果页面能流畅渲染，说明你的博客公式引擎性能良好。
