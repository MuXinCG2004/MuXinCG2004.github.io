// ============================================================
// 算法复习系列 - 模板汇总
// ============================================================

// ============================================================
// 1. 前缀和与差分
// ============================================================

// 一维前缀和
int a[MAXN], pre[MAXN];
void buildPrefix() {
    for (int i = 1; i <= n; i++) pre[i] = pre[i-1] + a[i];
}
int query(int l, int r) { return pre[r] - pre[l-1]; }

// 一维差分：对 [l, r] 区间加 v
int diff[MAXN];
void add(int l, int r, int v) { diff[l] += v; diff[r+1] -= v; }

// 二维前缀和
int pre2[MAXN][MAXN];
void buildPrefix2d() {
    for (int i = 1; i <= n; i++)
        for (int j = 1; j <= m; j++)
            pre2[i][j] = a[i][j] + pre2[i-1][j] + pre2[i][j-1] - pre2[i-1][j-1];
}
int query2d(int x1, int y1, int x2, int y2) {
    return pre2[x2][y2] - pre2[x1-1][y2] - pre2[x2][y1-1] + pre2[x1-1][y1-1];
}

// 二维差分
void add2d(int x1, int y1, int x2, int y2, int v) {
    diff[x1][y1] += v;
    diff[x2+1][y1] -= v;
    diff[x1][y2+1] -= v;
    diff[x2+1][y2+1] += v;
}

// ============================================================
// 2. 双指针与二分
// ============================================================

// 双指针 - 尺取法（最短子数组和 >= target）
int minLen = INT_MAX;
for (int l = 1, r = 1, sum = 0; r <= n; r++) {
    sum += a[r];
    while (sum >= target) {
        minLen = min(minLen, r - l + 1);
        sum -= a[l++];
    }
}

// 二分答案
int lo = 0, hi = 1e9;
while (lo < hi) {
    int mid = (lo + hi) / 2;
    if (check(mid)) hi = mid;
    else lo = mid + 1;
}

// 三分法（单峰函数极值）
double lo = L, hi = R;
for (int i = 0; i < 200; i++) {
    double m1 = lo + (hi - lo) / 3;
    double m2 = hi - (hi - lo) / 3;
    if (f(m1) < f(m2)) lo = m1;
    else hi = m2;
}

// ============================================================
// 3. 贪心
// ============================================================

// 区间调度 - 选最多不重叠区间（按右端点排序）
struct Interval { int l, r; };
bool cmp(const Interval &a, const Interval &b) { return a.r < b.r; }
int solve(Interval a[], int n) {
    sort(a, a + n, cmp);
    int cnt = 0, last = -1e9;
    for (int i = 0; i < n; i++) {
        if (a[i].l >= last) { cnt++; last = a[i].r; }
    }
    return cnt;
}

// 合并区间
sort(a, a + n, [](const Interval &x, const Interval &y) { return x.l < y.l; });
vector<Interval> res;
res.push_back(a[0]);
for (int i = 1; i < n; i++) {
    if (a[i].l <= res.back().r) res.back().r = max(res.back().r, a[i].r);
    else res.push_back(a[i]);
}

// ============================================================
// 4. 搜索与回溯
// ============================================================

// BFS（网格最短路）
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

// DFS 回溯（全排列）
int path[MAXN], vis[MAXN];
void permutation(int dep) {
    if (dep == n) {
        for (int i = 0; i < n; i++) cout << path[i] << " ";
        cout << "\n";
        return;
    }
    for (int i = 1; i <= n; i++) {
        if (vis[i]) continue;
        vis[i] = 1; path[dep] = i;
        permutation(dep + 1);
        vis[i] = 0;
    }
}

// DFS 回溯（组合 C(n,k)）
int chosen[MAXN];
void combination(int dep, int start) {
    if (dep == k) {
        for (int i = 0; i < k; i++) cout << chosen[i] << " ";
        cout << "\n";
        return;
    }
    for (int i = start; i <= n; i++) {
        chosen[dep] = i;
        combination(dep + 1, i + 1);
    }
}

// ============================================================
// 5. 基础 DP
// ============================================================

// 01背包
int dp[MAXW];
for (int i = 1; i <= n; i++)
    for (int j = W; j >= w[i]; j--)
        dp[j] = max(dp[j], dp[j - w[i]] + v[i]);

// 完全背包
for (int i = 1; i <= n; i++)
    for (int j = w[i]; j <= W; j++)
        dp[j] = max(dp[j], dp[j - w[i]] + v[i]);

// 多重背包（二进制拆分）
vector<int> nw, nv;
for (int i = 1; i <= n; i++) {
    int s = s_[i], k = 1;
    while (k <= s) {
        nw.push_back(k * w[i]);
        nv.push_back(k * v[i]);
        s -= k; k *= 2;
    }
    if (s > 0) { nw.push_back(s * w[i]); nv.push_back(s * v[i]); }
}

// LIS O(n log n)
int tails[MAXN], len = 0;
for (int i = 0; i < n; i++) {
    int pos = lower_bound(tails, tails + len, a[i]) - tails;
    tails[pos] = a[i];
    if (pos == len) len++;
}

// LCS O(nm)
int dp[MAXN][MAXN];
for (int i = 1; i <= n; i++)
    for (int j = 1; j <= m; j++)
        if (a[i] == b[j]) dp[i][j] = dp[i-1][j-1] + 1;
        else dp[i][j] = max(dp[i-1][j], dp[i][j-1]);

// ============================================================
// 6. 进阶 DP
// ============================================================

// 区间 DP（石子合并）
memset(dp, 0x3f, sizeof dp);
for (int i = 1; i <= n; i++) dp[i][i] = 0;
for (int len = 2; len <= n; len++)
    for (int l = 1; l + len - 1 <= n; l++) {
        int r = l + len - 1;
        for (int k = l; k < r; k++)
            dp[l][r] = min(dp[l][r], dp[l][k] + dp[k+1][r] + pre[r] - pre[l-1]);
    }

// 树形 DP（最大独立集）
vector<int> adj[MAXN];
int dp[MAXN][2];
void dfs(int u, int fa) {
    dp[u][0] = 0; dp[u][1] = val[u];
    for (int v : adj[u]) {
        if (v == fa) continue;
        dfs(v, u);
        dp[u][0] += max(dp[v][0], dp[v][1]);
        dp[u][1] += dp[v][0];
    }
}

// 数位 DP
int a_[20], dp[20][STATE];
int dfs(int pos, int state, bool limit, bool lead) {
    if (pos < 0) return /* 满足条件返回1 */;
    if (!limit && !lead && dp[pos][state] != -1) return dp[pos][state];
    int up = limit ? a_[pos] : 9;
    int res = 0;
    for (int d = 0; d <= up; d++)
        res += dfs(pos - 1, newState(state, d), limit && d == up, lead && d == 0);
    if (!limit && !lead) dp[pos][state] = res;
    return res;
}

// 状压 DP（TSP）
int dp[1 << MAXN][MAXN];
memset(dp, 0x3f, sizeof dp);
dp[1][0] = 0;
for (int S = 1; S < (1 << n); S++)
    for (int u = 0; u < n; u++) {
        if (!(S >> u & 1)) continue;
        for (int v = 0; v < n; v++) {
            if (S >> v & 1) continue;
            dp[S | (1 << v)][v] = min(dp[S | (1 << v)][v], dp[S][u] + dist[u][v]);
        }
    }

// ============================================================
// 7. 并查集
// ============================================================

int fa[MAXN], rk[MAXN];
void init(int n) { for (int i = 1; i <= n; i++) fa[i] = i, rk[i] = 0; }
int find(int x) { return fa[x] == x ? x : fa[x] = find(fa[x]); }
void unite(int x, int y) {
    x = find(x); y = find(y);
    if (x == y) return;
    if (rk[x] < rk[y]) swap(x, y);
    fa[y] = x;
    if (rk[x] == rk[y]) rk[x]++;
}
bool connected(int x, int y) { return find(x) == find(y); }

// 带权并查集
int fa[MAXN], d[MAXN];
int find(int x) {
    if (fa[x] == x) return x;
    int root = find(fa[x]);
    d[x] = (d[x] + d[fa[x]]) % 3;
    return fa[x] = root;
}

// ============================================================
// 8. 树状数组与线段树
// ============================================================

// 树状数组
int tree[MAXN];
int lowbit(int x) { return x & (-x); }
void update(int i, int v) { for (; i <= n; i += lowbit(i)) tree[i] += v; }
int query(int i) { int s = 0; for (; i > 0; i -= lowbit(i)) s += tree[i]; return s; }
int query(int l, int r) { return query(r) - query(l - 1); }

// 线段树（区间修改 + 区间查询）
int tree[MAXN * 4], lazy[MAXN * 4];
void pushup(int p) { tree[p] = tree[p*2] + tree[p*2+1]; }
void pushdown(int p, int len) {
    if (lazy[p]) {
        tree[p*2] += lazy[p] * (len - len / 2);
        tree[p*2+1] += lazy[p] * (len / 2);
        lazy[p*2] += lazy[p];
        lazy[p*2+1] += lazy[p];
        lazy[p] = 0;
    }
}
void build(int p, int l, int r) {
    lazy[p] = 0;
    if (l == r) { tree[p] = a[l]; return; }
    int mid = (l + r) / 2;
    build(p*2, l, mid); build(p*2+1, mid+1, r);
    pushup(p);
}
void update(int p, int l, int r, int ql, int qr, int v) {
    if (ql <= l && r <= qr) { tree[p] += v * (r-l+1); lazy[p] += v; return; }
    pushdown(p, r-l+1);
    int mid = (l + r) / 2;
    if (ql <= mid) update(p*2, l, mid, ql, qr, v);
    if (qr > mid) update(p*2+1, mid+1, r, ql, qr, v);
    pushup(p);
}
long long query(int p, int l, int r, int ql, int qr) {
    if (ql <= l && r <= qr) return tree[p];
    pushdown(p, r-l+1);
    int mid = (l + r) / 2;
    long long res = 0;
    if (ql <= mid) res += query(p*2, l, mid, ql, qr);
    if (qr > mid) res += query(p*2+1, mid+1, r, ql, qr);
    return res;
}

// ============================================================
// 9. ST 表与字典树
// ============================================================

// ST 表
int st[MAXN][21], lg[MAXN];
void buildST() {
    for (int i = 2; i <= n; i++) lg[i] = lg[i/2] + 1;
    for (int i = 1; i <= n; i++) st[i][0] = a[i];
    for (int j = 1; (1 << j) <= n; j++)
        for (int i = 1; i + (1 << j) - 1 <= n; i++)
            st[i][j] = max(st[i][j-1], st[i + (1 << (j-1))][j-1]);
}
int queryRMQ(int l, int r) {
    int k = lg[r - l + 1];
    return max(st[l][k], st[r - (1 << k) + 1][k]);
}

// 字典树
int ch[MAXN][26], cnt[MAXN], tot = 0;
void insert(const char *s) {
    int u = 0;
    for (int i = 0; s[i]; i++) {
        int c = s[i] - 'a';
        if (!ch[u][c]) ch[u][c] = ++tot;
        u = ch[u][c];
    }
    cnt[u]++;
}
int query(const char *s) {
    int u = 0;
    for (int i = 0; s[i]; i++) {
        int c = s[i] - 'a';
        if (!ch[u][c]) return 0;
        u = ch[u][c];
    }
    return cnt[u];
}

// ============================================================
// 10. 最短路
// ============================================================

// Dijkstra（堆优化）
typedef pair<int,int> pii;
int dist[MAXN], vis[MAXN];
vector<pii> adj[MAXN];
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
        for (auto [v, w] : adj[u])
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                pq.push({dist[v], v});
            }
    }
}

// Floyd
int dp[MAXN][MAXN];
void floyd() {
    for (int k = 1; k <= n; k++)
        for (int i = 1; i <= n; i++)
            for (int j = 1; j <= n; j++)
                dp[i][j] = min(dp[i][j], dp[i][k] + dp[k][j]);
}

// SPFA（判负环）
int dist[MAXN], cnt[MAXN], inq[MAXN];
bool spfa(int s) {
    memset(dist, 0x3f, sizeof dist);
    memset(cnt, 0, sizeof cnt);
    memset(inq, 0, sizeof inq);
    dist[s] = 0; inq[s] = 1;
    queue<int> q; q.push(s);
    while (!q.empty()) {
        int u = q.front(); q.pop(); inq[u] = 0;
        for (auto [v, w] : adj[u])
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                cnt[v] = cnt[u] + 1;
                if (cnt[v] >= n) return false;
                if (!inq[v]) { q.push(v); inq[v] = 1; }
            }
    }
    return true;
}

// ============================================================
// 11. 最小生成树
// ============================================================

// Kruskal
struct Edge { int u, v, w; };
bool cmp(const Edge &a, const Edge &b) { return a.w < b.w; }
int kruskal(Edge edges[], int m) {
    sort(edges, edges + m, cmp);
    init(n);
    int res = 0, cnt = 0;
    for (int i = 0; i < m && cnt < n - 1; i++) {
        if (find(edges[i].u) != find(edges[i].v)) {
            unite(edges[i].u, edges[i].v);
            res += edges[i].w; cnt++;
        }
    }
    return cnt == n - 1 ? res : -1;
}

// Prim（堆优化）
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
        for (auto [v, w] : adj[u])
            if (!vis[v] && w < dist[v]) {
                dist[v] = w;
                pq.push({dist[v], v});
            }
    }
    return cnt == n ? res : -1;
}

// ============================================================
// 12. 拓扑排序与 Tarjan
// ============================================================

// 拓扑排序（Kahn）
int deg[MAXN];
vector<int> adj[MAXN], topo;
bool topoSort() {
    queue<int> q;
    for (int i = 1; i <= n; i++) if (deg[i] == 0) q.push(i);
    while (!q.empty()) {
        int u = q.front(); q.pop();
        topo.push_back(u);
        for (int v : adj[u]) if (--deg[v] == 0) q.push(v);
    }
    return topo.size() == n;
}

// Tarjan 强连通分量
int dfn[MAXN], low[MAXN], timer = 0;
int stk[MAXN], top = 0, inStk[MAXN];
int scc[MAXN], sccCnt = 0;
void tarjanSCC(int u) {
    dfn[u] = low[u] = ++timer;
    stk[++top] = u; inStk[u] = 1;
    for (int v : adj[u]) {
        if (!dfn[v]) { tarjanSCC(v); low[u] = min(low[u], low[v]); }
        else if (inStk[v]) low[u] = min(low[u], dfn[v]);
    }
    if (dfn[u] == low[u]) {
        sccCnt++;
        while (true) {
            int v = stk[top--]; inStk[v] = 0; scc[v] = sccCnt;
            if (v == u) break;
        }
    }
}

// Tarjan 割点
bool cut[MAXN];
void tarjanCut(int u, int fa) {
    dfn[u] = low[u] = ++timer;
    int child = 0;
    for (int v : adj[u]) {
        if (!dfn[v]) {
            child++;
            tarjanCut(v, u);
            low[u] = min(low[u], low[v]);
            if (fa == -1 && child > 1) cut[u] = true;
            if (fa != -1 && low[v] >= dfn[u]) cut[u] = true;
        } else if (v != fa) low[u] = min(low[u], dfn[v]);
    }
}

// ============================================================
// 13. 二分图与网络流
// ============================================================

// 匈牙利算法
int match[MAXN], vis[MAXN];
bool dfs(int u) {
    for (int v : adj[u]) {
        if (vis[v]) continue;
        vis[v] = 1;
        if (!match[v] || dfs(match[v])) { match[v] = u; return true; }
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

// Dinic 最大流
struct FlowEdge { int to, rev; int cap; };
vector<FlowEdge> graph[MAXN];
int level[MAXN], iter[MAXN];
void addEdge(int u, int v, int cap) {
    graph[u].push_back({v, (int)graph[v].size(), cap});
    graph[v].push_back({u, (int)graph[u].size()-1, 0});
}
bool bfs(int s, int t) {
    memset(level, -1, sizeof level);
    queue<int> q; level[s] = 0; q.push(s);
    while (!q.empty()) {
        int u = q.front(); q.pop();
        for (auto &e : graph[u])
            if (e.cap > 0 && level[e.to] < 0) { level[e.to] = level[u]+1; q.push(e.to); }
    }
    return level[t] >= 0;
}
int dfs(int u, int t, int f) {
    if (u == t) return f;
    for (int &i = iter[u]; i < graph[u].size(); i++) {
        FlowEdge &e = graph[u][i];
        if (e.cap > 0 && level[e.to] == level[u]+1) {
            int d = dfs(e.to, t, min(f, e.cap));
            if (d > 0) { e.cap -= d; graph[e.to][e.rev].cap += d; return d; }
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

// ============================================================
// 14. KMP 与字符串哈希
// ============================================================

// KMP
int nxt[MAXN];
void buildNext(const char *p, int m) {
    nxt[0] = 0;
    for (int i = 1, j = 0; i < m; i++) {
        while (j && p[i] != p[j]) j = nxt[j-1];
        if (p[i] == p[j]) j++;
        nxt[i] = j;
    }
}
void kmpSearch(const char *t, int n, const char *p, int m) {
    buildNext(p, m);
    for (int i = 0, j = 0; i < n; i++) {
        while (j && t[i] != p[j]) j = nxt[j-1];
        if (t[i] == p[j]) j++;
        if (j == m) { /* 匹配位置: i-m+1 */ j = nxt[j-1]; }
    }
}

// 字符串哈希（双哈希）
typedef unsigned long long ull;
const ull BASE1 = 131, BASE2 = 13331;
const ull MOD1 = 1e9+7, MOD2 = 1e9+9;
ull h1[MAXN], h2[MAXN], pw1[MAXN], pw2[MAXN];
void buildHash(const char *s, int n) {
    pw1[0] = pw2[0] = 1;
    for (int i = 1; i <= n; i++) {
        pw1[i] = pw1[i-1] * BASE1 % MOD1;
        pw2[i] = pw2[i-1] * BASE2 % MOD2;
    }
    for (int i = 1; i <= n; i++) {
        h1[i] = (h1[i-1] * BASE1 + s[i]) % MOD1;
        h2[i] = (h2[i-1] * BASE2 + s[i]) % MOD2;
    }
}
pair<ull,ull> getHash(int l, int r) {
    ull v1 = (h1[r] - h1[l-1] * pw1[r-l+1] % MOD1 + MOD1) % MOD1;
    ull v2 = (h2[r] - h2[l-1] * pw2[r-l+1] % MOD2 + MOD2) % MOD2;
    return {v1, v2};
}

// ============================================================
// 15. Manacher 与 AC 自动机
// ============================================================

// Manacher
char t[MAXN * 2];
int p[MAXN * 2];
int manacher(const char *s, int n) {
    int m = 0;
    t[m++] = '$'; t[m++] = '#';
    for (int i = 0; i < n; i++) { t[m++] = s[i]; t[m++] = '#'; }
    t[m++] = '@';
    int c = 0, r = 0, ans = 0;
    for (int i = 1; i < m - 1; i++) {
        p[i] = (i < r) ? min(p[2*c-i], r-i) : 1;
        while (t[i+p[i]] == t[i-p[i]]) p[i]++;
        if (i + p[i] > r) { c = i; r = i + p[i]; }
        ans = max(ans, p[i] - 1);
    }
    return ans;
}

// AC 自动机
int ch[MAXN][26], fail[MAXN], val[MAXN], tot = 0;
void acInsert(const char *s, int id) {
    int u = 0;
    for (int i = 0; s[i]; i++) {
        int c = s[i] - 'a';
        if (!ch[u][c]) ch[u][c] = ++tot;
        u = ch[u][c];
    }
    val[u] = id;
}
void acBuild() {
    queue<int> q;
    for (int c = 0; c < 26; c++) if (ch[0][c]) q.push(ch[0][c]);
    while (!q.empty()) {
        int u = q.front(); q.pop();
        for (int c = 0; c < 26; c++) {
            if (ch[u][c]) { fail[ch[u][c]] = ch[fail[u]][c]; q.push(ch[u][c]); }
            else ch[u][c] = ch[fail[u]][c];
        }
    }
}
void acQuery(const char *t) {
    int u = 0;
    for (int i = 0; t[i]; i++) {
        u = ch[u][t[i] - 'a'];
        for (int j = u; j; j = fail[j])
            if (val[j]) { /* 模式串 val[j] 匹配 */ }
    }
}

// ============================================================
// 16. 数学
// ============================================================

// 快速幂
long long qpow(long long a, long long b, long long mod) {
    long long res = 1; a %= mod;
    while (b > 0) {
        if (b & 1) res = res * a % mod;
        a = a * a % mod; b >>= 1;
    }
    return res;
}

// 欧拉筛
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

// GCD / exGCD
long long gcd(long long a, long long b) { return b ? gcd(b, a%b) : a; }
long long exgcd(long long a, long long b, long long &x, long long &y) {
    if (!b) { x = 1; y = 0; return a; }
    long long d = exgcd(b, a%b, y, x);
    y -= a/b * x;
    return d;
}

// 逆元
long long inv(long long a, long long mod) { return qpow(a, mod-2, mod); }

// 组合数
long long fac[MAXN], ifac[MAXN];
void initC(int n, long long mod) {
    fac[0] = 1;
    for (int i = 1; i <= n; i++) fac[i] = fac[i-1] * i % mod;
    ifac[n] = inv(fac[n], mod);
    for (int i = n-1; i >= 0; i--) ifac[i] = ifac[i+1] * (i+1) % mod;
}
long long C(int n, int m, long long mod) {
    if (m < 0 || m > n) return 0;
    return fac[n] % mod * ifac[m] % mod * ifac[n-m] % mod;
}

// Lucas
long long lucas(long long n, long long m, long long p) {
    if (!m) return 1;
    return C(n%p, m%p, p) * lucas(n/p, m/p, p) % p;
}

// 矩阵快速幂
struct Matrix { long long a[MAXN][MAXN]; int n; };
Matrix mul(Matrix &A, Matrix &B, long long mod) {
    Matrix C; C.n = A.n; memset(C.a, 0, sizeof C.a);
    for (int i = 0; i < A.n; i++)
        for (int k = 0; k < A.n; k++) if (A.a[i][k])
            for (int j = 0; j < A.n; j++)
                C.a[i][j] = (C.a[i][j] + A.a[i][k] * B.a[k][j]) % mod;
    return C;
}
Matrix matpow(Matrix A, long long b, long long mod) {
    Matrix res; res.n = A.n; memset(res.a, 0, sizeof res.a);
    for (int i = 0; i < A.n; i++) res.a[i][i] = 1;
    while (b > 0) {
        if (b & 1) res = mul(res, A, mod);
        A = mul(A, A, mod); b >>= 1;
    }
    return res;
}
