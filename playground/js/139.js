/**
 * 递归+备忘录
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
var wordBreak = function (s, wordDict) {
    const map = wordDict.reduce((acc, crr) => {
        acc[crr] = crr;
        return acc;
    }, {});
    const cache = {};
    const getCacheData = (i, j) => {
        const key = `${[i, j]}`;
        if (cache[key] === undefined) cache[key] = match(i, j);
        return cache[key];
    };
    const match = (i, j) => {
        if (j >= s.length) return i >= s.length ? true : false;
        const str = s.slice(i, j + 1);
        if (map[str]) {
            return getCacheData(j + 1, j + 1) || getCacheData(i, j + 1);
        } else {
            return getCacheData(i, j + 1);
        }
    }
    return match(0, 0);
};

/**
 * dp
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
var wordBreak = function (s, wordDict) {
    const map = wordDict.reduce((acc, crr) => {
        acc[crr] = crr;
        return acc;
    }, {});
    const dp = new Array(s.length).fill().map(() => new Array(s.length).fill(false));
    


    return dp[0][s.length - 1];
};