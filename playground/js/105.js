/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val)
    this.left = (left===undefined ? null : left)
    this.right = (right===undefined ? null : right)
}
/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function(preorder, inorder) {
    if (!preorder.length) return null;
    const build = (i1, i2, i3, i4) => {
        if (i1 > i2) return null;
        const rootVal = preorder[i1];
        const index = inorder.findIndex((v, i) => i >= i3 && v === rootVal);
        const leftSize = index - i3;
        const root = new TreeNode(rootVal);
        root.left = build(i1 + 1, i1 + leftSize, i3, index - 1);
        root.right = build(i1 + leftSize + 1, i2, index + 1, i4);
        return root;
    };
    const index = preorder.length - 1;
    return build(0, index, 0, index);
};


var buildTree = function(inorder, postorder) {
    if (!inorder.length) return null;
    const build = (i1, i2, i3, i4) => {
        if (i1 > i2) return null;
        const rootVal = postorder[i2];
        const index = inorder.findIndex((v, i) => i >= i3 && v === rootVal);
        const leftSize = index - i3;
        const root = new TreeNode(rootVal);
        root.left = build(i1, i1 + leftSize - 1, i3, index - 1);
        root.right = build(i1 + leftSize, i2 - 1, index + 1, i4);
        return root;
    };
    const index = inorder.length - 1;
    return build(0, index, 0, index);
};