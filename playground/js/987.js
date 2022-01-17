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
    const ret = [];
    if (!root) return ret;
    const queue = [root];
    while (queue.filter(Boolean).length) {
        const arr = [];
        const num = queue.length;
        let i = 0;
        while (i < num) {
            i += 1;
            const node = queue.pop();
            arr.push(node?.val);
            queue.unshift(node?.left);
            queue.unshift(node?.right);
        }
        ret.push(arr);
    }
    const matrix = {};
    ret.forEach((arr, y) => {
        const start = y ? 2 ** (y - 1) : 0;
        arr.forEach((val, index) => {
            if (val) {
                const x = -start + index;
                if (!matrix[x]) matrix[x] = {};
                matrix[x][y] = val;
            }
        });
    });
    const v = [];
    Object.keys(matrix).sort((a,b) => a - b).forEach(x => {
        v.push(Object.keys(matrix[x]).sort((a,b) => a - b).reduce((acc, y) => {
            acc.push(matrix[x][y]);
            return acc;
        }, []).sort((a,b) => a - b));
    });
    return v;
};