# Knapsack Problems

- 01背包：物品只能被选择1次
- 无限背包：物品可以被无限选择

## 01背包问题

- `给你一个可装载重量为 W 的背包和 N 个物品，每个物品有重量和价值两个属性。其中第 i 个物品的重量为 wt[i]，价值为 val[i]，现在让你用这个背包装物品，最多能装的价值是多少？`

需要穷举所有可能，并找出最优解，同时复杂问题可以转换为独立的子问题，所以都可以用动态规划去求解。

此处这个01背包的解, 既可以用dfs的方式去解，一次只有两个操作，加或不加物品：

```js
var knapsack = function(payload, items) {
    const dfs = (i, totalValue, totalWeight) => {
        const item = items[i];
        let add = 0;
        let notAdd = 0;
        if (item) {
            notAdd = dfs(i + 1, totalValue, totalWeight);
            if ((totalWeight + item.weight) <= payload) {
                add = dfs(i + 1, totalValue + item.val, totalWeight + item.weight);
            }
        }
        return Math.max(add, notAdd, totalValue);
    }
    return dfs(0, 0, 0);
};
knapsack(6, [{weight: 3, val: 5},{weight: 2, val: 4},{weight: 4, val: 2}]); // 9
```

使用动态规划的解法：

- dp[i][w] 的定义：对于前 i 个物品，当前背包的容量为 w，这种情况下可以装的最大价值

```js
var knapsack = function(payload, items) {
    // 已初始化的base case
    // 因为是使用数组下标表示定义，所以初始化都要+1
    const dp = Array(items.length + 1).fill(null).map(() => new Array(payload + 1).fill(0));
    // 此次循环内，判断要不要把第i-1个物品放入背包
    for (let i = 1; i <= items.length; i++) {
        for (let w = 1; w <= payload; w++) {
            const weight = items[i - 1].weight;
            const val = items[i - 1].val;
            const left = w - weight;
            if (left < 0) {
                // 这种情况下只能选择不装入背包
                dp[i][w] = dp[i - 1][w];
            } else {
                // 装入或者不装入背包，择优
                dp[i][w] = Math.max(
                    dp[i - 1][left] + val, 
                    dp[i - 1][w]
                );
            }
        }
    }
    return dp[items.length][payload];
};
knapsack(4, [{weight: 2, val: 4},{weight: 1, val: 2},{weight: 3, val: 3}]); // 6
```

## 01背包问题：416. Partition Equal Subset Sum

source: <https://leetcode.com/problems/coin-change-ii/>

### Question

Given an integer array nums, return true if you can partition the array into two subsets such that the sum of the elements in both subsets is equal or false otherwise.

### 动态规划法

其实就是相当于把一个载重等于sum/2，用nums里的石头填满的01背包问题.

- dp[i][w] 的定义：对于前 i 个物品，当前背包的容量为 w，这种情况下是否刚好装满

```ts
function canPartition(nums: number[]): boolean {
    const sum = nums.reduce((acc, crr) => acc + crr, 0);
    if (sum % 2 === 1) return false;
    const half = sum >> 1;
    const dp = Array(nums.length + 1).fill(null).map(() => {
        const l = Array(half + 1).fill(false);
        l[0] = true;
        return l;
    });
    for (let i = 1; i <= nums.length; i++) {
        for (let w = 1; w <= half; w++) {
            const left = w - nums[i - 1];
            if (left < 0) {
                dp[i][w] = dp[i - 1][w];
            } else {
                // 如果装了第i个物品，看背包的剩余空间left是否装得下
                // 如果left空间是可以被装满的，那么第i个物品放进恰好可以装满
                dp[i][w] = dp[i - 1][w] || dp[i - 1][left]
            }
        }
    }
    return dp[nums.length][half];
};
```


## 完全背包问题: 518. Coin Change II

source: <https://leetcode.com/problems/coin-change-ii/>

### Question

You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money.

Return the number of combinations that make up that amount. If that amount of money cannot be made up by any combination of the coins, return 0.

You may assume that you have an infinite number of each kind of coin.

### 备忘录法

这道题和上一道比较明显的区别是，这一道题里的硬币是无限的，而且是去找到所有的解。

```js
/**
 * @param {number} amount
 * @param {number[]} coins
 * @return {number}
 */
var change = function(amount, coins) {
    const getCache = (fn) => {
        const cache = {};
        return (...args) => {
            const key = args.sort().join('.');
            if (cache[key] === undefined) {
                cache[key] = fn(...args);
            }
            return cache[key];
        };
    };
    const cache = getCache(dfs);
    let ret = [];
    function dfs(...args) {
        const sum = args.reduce((acc, crr) => acc + crr, 0);
        if (sum === amount) {
            ret.push(args);
            return;
        }
        if (sum > amount) {
            return;
        }
        coins.forEach(coin => {
            cache(...args, coin);
        });
    }
    cache(0);
    const obj = ret.reduce((acc, crr) => {
        const key = crr.sort().join('.');
        if (!acc[key]) {
            acc[key] = true;
        }
        return acc;
    }, {});
    return Object.keys(obj).length;
};
```

### 动态规划

这是一个典型的完全背包问题：

```ts
function change(amount: number, coins: number[]): number {
    const dp = Array(coins.length + 1).fill(null).map(() => {
        const l = Array(amount + 1).fill(0);
        // base case
        l[0] = 1;
        return l;
    });
    for (let i = 1; i <= coins.length; i++) {
        for (let n = 1; n <= amount; n ++) {
            const left = n - coins[i - 1];
            if (left < 0) {
                dp[i][n] = dp[i - 1][n];
            } else {
                // 01背包中择优，完全背包中累加
                dp[i][n] = dp[i - 1][n] + dp[i][left];
            }
        }
    }
    return dp[coins.length][amount];
};
```

## 变种01背包：1049. Last Stone Weight II

source: <https://leetcode.com/problems/last-stone-weight-ii/>

### Question

You are given an array of integers stones where stones[i] is the weight of the ith stone.

We are playing a game with the stones. On each turn, we choose any two stones and smash them together. Suppose the stones have weights x and y with x <= y. The result of this smash is:

If x == y, both stones are destroyed, and
If x != y, the stone of weight x is destroyed, and the stone of weight y has new weight y - x.
At the end of the game, there is at most one stone left.

Return the smallest possible weight of the left stone. If there are no stones left, return 0.

### 备忘录法

对于两块石头，因为追求的是总体最小差值，所以可以有两种操作：

- 求和
- 求差

那么就可以用暴力法把所有的可能性列出来：


```js
/**
 * @param {number[]} stones
 * @return {number}
 */
var lastStoneWeightII = function(stones) {
    const dfs = (i, left) => {
        if (i === stones.length) {
            return Math.abs(left);
        }
        const pos = dfs(i + 1, left + stones[i]);
        const neg = dfs(i + 1, left - stones[i]);
        return Math.min(pos, neg);
    };
    return dfs(0, 0);
};
```

### 动态规划法

如果要用背包去理解，因为石头是可以互相粉碎的，有个很重要的理解：

- `留下来的石头重量最小值，等于往一个sum/2的背包里放石头能放的最大值 * 2`

理解了之后，就能用常规的01背包的模板去解了。

```ts
function lastStoneWeightII(stones: number[]): number {
    const sum = stones.reduce((acc, crr) => acc + crr, 0);
    const half = sum >> 1;
    const dp = Array(stones.length + 1).fill(null).map(() => Array(half + 1).fill(0));
    for (let i = 1; i <= stones.length; i++) {
        for (let w = 0; w <= half; w++) {
            const left = w - stones[i - 1];
            if (left < 0) {
                dp[i][w] = dp[i - 1][w];
            } else {
                dp[i][w] = Math.max(
                    dp[i - 1][w],
                    // left最大值，加上现在石头的重量
                    dp[i - 1][left] + stones[i - 1]
                );
            }
        }
    }
    return sum - 2 * dp[stones.length][half];
};
```

优化空间后:

```js
/**
 * @param {number[]} stones
 * @return {number}
 */
var lastStoneWeightII = function(stones) {
    const sum = stones.reduce((acc, crr) => acc + crr, 0);
    const half = sum >> 1;
    const dp = new Array(half + 1).fill(0);
    for (let stone of stones) {
        for (let j = half; j >= stone; j--) {
            dp[j] = Math.max(dp[j], dp[j - stone] + stone)
        }
    }
    return sum - dp[half] * 2;
};
```

## 总结

- <https://labuladong.github.io/algo/di-er-zhan-a01c6/bei-bao-le-34bd4/jing-dian--70de0/>
