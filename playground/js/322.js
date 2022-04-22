/**
 * 暴力法+备忘录
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function (coins, amount) {
    const cache = {};
    const run = (n) => {
        if (n === 0) return 0;
        if (n < 0) return -1;
        let ret = Infinity;
        for (let coin of coins) {
            const key = n - coin;
            if (!cache[key]) cache[key] = run(key);
            if (cache[key] < 0) continue;
            ret = Math.min(ret, cache[key] + 1);
        }
        return ret === Infinity ? -1 : ret;
    }
    return run(amount);
};

/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function (coins, amount) {
    const dp = new Array(amount + 1).fill(amount + 1);
    dp[0] = 0;
    for (let i = 1; i < dp.length; i++) {
        for (let coin of coins) {
            const left = i - coin;
            if (left < 0) continue;
            dp[i] = Math.min(dp[i], dp[left] + 1);
        }
    }
    return dp[amount] === amount + 1 ? -1 : dp[amount];
};


