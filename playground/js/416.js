/**
 * 递归+备忘录
 * @param {number[]} nums
 * @return {boolean}
 */
var canPartition = function (nums) {
    // 前置判断
    if (nums.length < 2) return false;
    const sum = nums.reduce((acc, crr) => acc + crr, 0);
    if (sum % 2 === 1) return false;
    const max = Math.max(...nums);
    const targetValue = sum / 2;
    if (max > targetValue) return false;
    // 备忘录
    const cache = {};
    const getCacheData = (i, j) => {
        const key = `${i},${j}`;
        if (cache[key] === undefined) cache[key] = slice(i, j);
        return cache[key];
    };
    // 递归方法
    const slice = (i, total) => {
        if (i === nums.length) return false;
        const next = total + nums[i];
        if (total + nums[i] === targetValue) return true;
        return getCacheData(i + 1, total) || getCacheData(i + 1, next);
    };
    return slice(0, 0);
};

/**
 * dp
 * @param {number[]} nums
 * @return {boolean}
 */
var canPartition = function (nums) {
    // 前置判断
    if (nums.length < 2) return false;
    const sum = nums.reduce((acc, crr) => acc + crr, 0);
    if (sum % 2 === 1) return false;
    const max = Math.max(...nums);
    const targetValue = sum / 2;
    if (max > targetValue) return false;
    // 定义dp
    const dp = [];
};