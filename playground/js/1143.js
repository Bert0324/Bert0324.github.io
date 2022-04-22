/**
 * dp
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
var longestCommonSubsequence = function (text1, text2) {
    const dp = new Array(text1.length + 1).fill().map(() => new Array(text2.length + 1).fill(0));
    for (let i = text1.length - 1; i >= 0; i--) {
        for (let j = text2.length - 1; j >= 0; j--) {
            if (text1[i] === text2[j]) dp[i][j] = dp[i + 1][j + 1] + 1;
            else dp[i][j] = Math.max(dp[i][j + 1], dp[i + 1][j]);
        }
    }
    return dp[0][0];
};

/**
 * 递归+备忘录
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
var longestCommonSubsequence = function (text1, text2) {
    const cache = {};
    const getCacheData = (i, j) => {
        const key = `${[i, j]}`;
        if (cache[key] === undefined) cache[key] = find(i, j);
        return cache[key];
    };
    const find = (i, j) => {
        if (i === text1.length) return 0;
        if (j === text2.length) return 0;
        if (text1[i] === text2[j]) return getCacheData(i + 1, j + 1) + 1;
        else return Math.max(getCacheData(i + 1, j), getCacheData(i, j + 1), getCacheData(i + 1, j + 1));
    };
    return find(0, 0);
};