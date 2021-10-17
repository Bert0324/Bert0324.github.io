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
 * @return {number[]}
 */
 var postorderTraversal = function(root) {
    const ret = [];
    const stack = [];
    let crr = root;
    const take = (node, key) => {
        const v = node[key];
        node[key] = undefined;
        return v;
    };
    while (stack.length || crr) {
        while (crr) {
            stack.push(crr);
            crr = take(crr, 'left');
        }
        const node = stack.pop();
        if (node) {
            const right = take(node, 'right');
            if (right) {
                stack.push(node);
                crr = right;
            } else {
                ret.push(node.val);
            }
        }
    }
    return ret;
};