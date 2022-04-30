/**
 * 递归+备忘录
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function (s, p) {
    const cache = {};
    const getCacheData = (i, j) => {
        const key = `${[i, j]}`;
        if (cache[key] === undefined) cache[key] = match(i, j);
        return cache[key];
    };
    const match = (i, j) => {
        // 正则被匹配完，如果字符串也被匹配完，说明匹配
        if (j === p.length) return i === s.length;
        // 字符串被匹配完
        if (i === s.length) {
            // 非x*y*z*的情况
            if ((p.length - j) % 2 === 1) return false;
            for (; j + 1 < p.length; j += 2) if (p[j + 1] !== '*') return false;
            // x*y*z*的情况，说明匹配
            return true;
        }
        // 匹配
        if (s[i] === p[j] || p[j] === '.') {
            // 存在贪心
            // 可以匹配0次或者任意次，只要有一种情况成立就是valid
            if (p[j + 1] === '*') return getCacheData(i, j + 2) || getCacheData(i + 1, j);
            // 不存在贪心
            // 匹配刚好一次
            else return getCacheData(i + 1, j + 1);
        } else {
            // 存在贪心
            // 匹配0次
            if (p[j + 1] === '*') return getCacheData(i, j + 2);
            // 不存在贪心且不匹配
            else return false;
        }
    };
    return match(0, 0);
};

