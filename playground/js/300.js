/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function (nums) {
    const dp = [];
    dp[0] = 1;
    let ret = dp[0];
    for (let i = 1; i < nums.length; i++) {
        dp[i] = dp[0];
        dp.forEach((v, index) => {
            if (nums[index] < nums[i]) dp[i] = Math.max(v + 1, dp[i]);
        });
        ret = Math.max(dp[i], ret);
    }
    return ret;
};