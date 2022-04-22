/**
 * 递归+备忘录
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var minDistance = function (word1, word2) {
    const cache = {};
    const getCacheData = (i, j) => {
        const key = `${[i, j]}`;
        if (cache[key] === undefined) cache[key] = dp(i, j);
        return cache[key];
    };
    const find = (i, j) => {
        if (i === word1.length) return word2.length - j;
        if (j === word2.length) return word1.length - i;
        if (word1[i] === word2[j]) return getCacheData(i + 1, j + 1);
        else return Math.min(getCacheData(i, j + 1) + 1, getCacheData(i + 1, j) + 1, getCacheData(i + 1, j + 1) + 1);
    };
    return find(0, 0);
};

/**
 * dp
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var minDistance = function (word1, word2) {
    const dp = new Array(word1.length + 1).fill().map(() => new Array(word2.length + 1).fill(0));
    for (let i = word1.length; i >= 0; i--) dp[i][word2.length] = word1.length - i;
    for (let j = word2.length; j >= 0; j--) dp[word1.length][j] = word2.length - j;
    for (let i = word1.length - 1; i >= 0; i--) {
        for (let j = word2.length - 1; j >= 0; j--) {
            if (word1[i] === word2[j]) dp[i][j] = dp[i + 1][j + 1];
            else dp[i][j] = Math.min(
                dp[i][j + 1] + 1,
                dp[i + 1][j] + 1,
                dp[i + 1][j + 1] + 1
            );
        }
    }
    return dp[0][0];
};