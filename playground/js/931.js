/**
 * 暴力递归+备忘录
 * @param {number[][]} matrix
 * @return {number}
 */
var minFallingPathSum = function (matrix) {
    const lastLinePositionArr = [[-1, 0], [-1, -1], [-1, 1]];
    const invalidValue = null;
    const cache = {};
    const find = ([y, x]) => {
        const v = matrix[y][x];
        if (v === undefined) return invalidValue;
        if (y === 0) return v;
        let ret = Infinity;
        for (let i = 0; i < lastLinePositionArr.length; i++) {
            const lastY = y + lastLinePositionArr[i][0];
            const lastX = x + lastLinePositionArr[i][1];
            const key = `${[lastY, lastX]}`;
            if (cache[key] === undefined) cache[key] = find([lastY, lastX]);
            if (cache[key] !== invalidValue) ret = Math.min(cache[key] + v, ret);
        }
        return ret;
    };
    let ret = Infinity;
    const y = matrix.length - 1;
    for (let x = 0; x < matrix[0].length; x++) ret = Math.min(find([y, x]), ret);
    return ret;
};

/**
 * dp
 * @param {number[][]} matrix
 * @return {number}
 */
var minFallingPathSum = function (matrix) {
    const lastLinePositionArr = [-1, 0, 1];
    const dp = new Array(matrix.length);
    dp[0] = [...matrix[0]];
    for (let i = 1; i < matrix.length; i++) {
        dp[i] = [...matrix[i]].map((v, index) => {
            let ret = Infinity;
            lastLinePositionArr.forEach(last => {
                const x = last + index;
                if (dp[i - 1]?.[x] !== undefined) ret = Math.min(dp[i - 1][x], ret);
            });
            return ret + v;
        });
    }
    return dp[matrix.length - 1].sort((a, b) => a - b)[0];
};