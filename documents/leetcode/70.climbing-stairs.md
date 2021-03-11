# 70. Climbing Stairs

source: <https://leetcode.com/problems/climbing-stairs/>

## Question

You are climbing a staircase. It takes n steps to reach the top.

Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?

## 递归

```ts
function climbStairs(n: number): number {
    const steps = [1, 2];
    let ret = 0;
    const climb = (lastN: number) => {
        if (lastN === n) {
            ret += 1;
            return;
        }
        if (lastN > n) {
            return;
        }
        steps.forEach(step => climb(lastN + step));
    };
    climb(0);
    return ret;
};
```

这种解法比较简单容易想到，缺点是有很多重复计算，在leetcode上的test cases是会超时的。

## 动态规划

```ts
function climbStairs(n: number): number {
    const steps = [1, 2];
    const dp = new Array(n + 1).fill(1);
    for (let i = 2; i <= n; i++) {
        dp[i] = steps.reduce((acc, crr) => acc + dp[i - crr], 0);
    }
    return dp[n];
};
```
