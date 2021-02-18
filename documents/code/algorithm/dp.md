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

## Reference

- <https://zhuanlan.zhihu.com/p/78220312>
- <https://www.hackerearth.com/zh/practice/algorithms/dynamic-programming/introduction-to-dynamic-programming-1/tutorial/>

