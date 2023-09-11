# Dynamic Programming

```ts
const recursionFib = (n: number): number => {
	if (n === 1 || n === 2) return 1;
	return recursionFib(n - 1) + recursionFib(n - 2);
};

const dpFib = (n: number): number => {
	const dp = Array(n + 1).fill(0);
	dp[1] = dp[2] = 1;
	for (let i = 3; i <= n; i++) {
		dp[i] = dp[i - 1] + dp[i - 2];
	}
	return dp[n];
};
```

备忘录的cache方法：

```js
const getCache = (fn) => {
    const cache = {};
    return (...args) => {
        const key = args.join('.');
        if (cache[key] === undefined) {
            cache[key] = fn(...args);
        }
        return cache[key];
    };
};
const cache = getCache(dfs);
```

## 背包问题

- 01背包：物品只能被选择1次
- 无限背包：物品可以被无限选择



```ts
var knapsack = function(payload, items) {
    // 已初始化的base case
    const dp = Array(items.length + 1).fill(null).map(() => new Array(payload + 1).fill(0));
    for (let i = 1; i <= items.length; i++) {
        for (let w = 1; w <= payload; w++) {
            if (w - items[i - 1].weight < 0) {
                // 这种情况下只能选择不装入背包
                dp[i][w] = dp[i - 1][w];
            } else {
                // 装入或者不装入背包，择优
                dp[i][w] = Math.max(
                    dp[i - 1][w - items[i-1].weight] + items[i-1].val, 
                    dp[i - 1][w]
                );
            }
        }
    }

    return dp[items.length][payload];
};
knapsack(4, [{weight: 2, val: 4},{weight: 1, val: 2},{weight: 3, val: 3}]);
```

## Reference

- <https://zhuanlan.zhihu.com/p/78220312>
- <https://www.hackerearth.com/zh/practice/algorithms/dynamic-programming/introduction-to-dynamic-programming-1/tutorial/>
- <https://labuladong.github.io/algo/di-er-zhan-a01c6/bei-bao-le-34bd4/jing-dian--28f3c/>

