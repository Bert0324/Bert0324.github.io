/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var verticalTraversal = function(root) {
    if (!root) return [];
    const matrix = {};
    const dfs = (node, y, x) => {
        if (node) {
            if (!matrix[x]) matrix[x] = {};
            if (!matrix[x][y]) matrix[x][y] = [];
            matrix[x][y].push(node.val);
            dfs(node.left, y + 1, x - 1);
            dfs(node.right, y + 1, x + 1);
        }
    };
    dfs(root, 0, 0);
    const ret = [];
    Object.keys(matrix).sort((a,b) => a - b).forEach(x => {
        ret.push(Object.keys(matrix[x]).sort((a,b) => a - b).reduce((acc, y) => {
            matrix[x][y].sort((a,b) => a - b).forEach(item => acc.push(item));
            return acc;
        }, []));
    });
    return ret;
};

var verticalTraversal = function(root) {
    if (!root) return [];
    const coordinate = [];
    const dfs = (node, y, x) => {
        if (node) {
            coordinate.push([x, y, node.val]);
            dfs(node.left, y + 1, x - 1);
            dfs(node.right, y + 1, x + 1);
        }
    };
    dfs(root, 0, 0);
    const ret = [];
    let min = Number.MIN_SAFE_INTEGER;
    coordinate.sort((a, b) => {
        if (a[0] !== b[0]) return a[0] - b[0];
        if (a[1] !== b[1]) return a[1] - b[1];
        if (a[2] !== b[2]) return a[2] - b[2];
    });
    coordinate.forEach(([x, _, val]) => {
        if (min < x) {
            ret.push([]);
            min = x;
        }
        ret[ret.length - 1].push(val);
    });
    return ret;
};