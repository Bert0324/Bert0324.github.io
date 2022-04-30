/**
 * 递归+备忘录
 * @param {string} s1
 * @param {string} s2
 * @return {number}
 */
var minimumDeleteSum = function (s1, s2) {
    const cache = {};
    const getCacheData = (i, j) => {
        const key = `${[i, j]}`;
        if (cache[key] === undefined) cache[key] = find(i, j);
        return cache[key];
    };
    const getCharCode = (chars) => Array.from(chars || '').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const find = (i, j) => {
        if (i === s1.length) return getCharCode(s2.slice(j, s2.length));
        if (j === s2.length) return getCharCode(s1.slice(i, s1.length));
        if (s1[i] === s2[j]) return getCacheData(i + 1, j + 1);
        else return Math.min(
            getCacheData(i + 1, j + 1) + getCharCode(s1[i]) + getCharCode(s2[j]),
            getCacheData(i + 1, j) + getCharCode(s1[i]),
            getCacheData(i, j + 1) + getCharCode(s2[j])
        );
    };
    return find(0, 0);
};


/**
 * dp
 * @param {string} s1
 * @param {string} s2
 * @return {number}
 */
var minimumDeleteSum = function (s1, s2) {
    const dp = new Array(s1.length + 1).fill().map(() => new Array(s2.length + 1).fill(0));
    const getCharCode = (chars) => Array.from(chars || '').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    for (let i = 0; i < s1.length; i++) dp[i][s2.length] = getCharCode(s1.slice(i, s1.length));
    for (let j = 0; j < s2.length; j++) dp[s1.length][j] = getCharCode(s2.slice(j, s2.length));
    for (let i = s1.length - 1; i >= 0; i--) {
        for (let j = s2.length - 1; j >= 0; j--) {
            if (s1[i] === s2[j]) dp[i][j] = dp[i + 1][j + 1];
            else dp[i][j] = Math.min(
                dp[i + 1][j + 1] + getCharCode(s1[i]) + getCharCode(s2[j]),
                dp[i + 1][j] + getCharCode(s1[i]),
                dp[i][j + 1] + getCharCode(s2[j])
            );
        }
    }
    return dp[0][0];
};