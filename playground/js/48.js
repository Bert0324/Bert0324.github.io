/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var rotate = function (matrix) {
    const n = matrix.length;
    const ret = [];
    for (let x = 0; x < n; x++) ret.push([]);
    for (let y = n - 1; y >= 0; y--) {
        const line = matrix[y];
        for (let x = 0; x < n; x++) ret[x][n - 1 - y] = line[x];
    }
    for (let x = 0; x < n; x++) matrix[x] = ret[x];
};