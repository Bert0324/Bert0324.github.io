/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
    const dp = [];
    dp[0] = nums[0];
    let ret = nums[0];
    for (let i = 1; i < nums.length; i++) {
        const next = dp[i - 1] + nums[i];
        dp[i] = next >= nums[i] ? next : nums[i];
        ret = Math.max(dp[i], ret);
    }
    return ret;
};