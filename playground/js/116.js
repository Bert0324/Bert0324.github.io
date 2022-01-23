/**
 * // Definition for a Node.
 * function Node(val, left, right, next) {
 *    this.val = val === undefined ? null : val;
 *    this.left = left === undefined ? null : left;
 *    this.right = right === undefined ? null : right;
 *    this.next = next === undefined ? null : next;
 * };
 */

/**
 * @param {Node} root
 * @return {Node}
 */
var connect = function (root) {
    if (!root) return root;
    const list = [];
    const queue = [root];
    while (queue.length) {
        const num = queue.length;
        const sub = [];
        let i = 0;
        while (i < num) {
            i += 1;
            const node = queue.shift();
            if (!node) continue;
            sub.push(node);
            queue.push(node.left);
            queue.push(node.right);
        }
        list.push(sub);
    }
    list.forEach(sub => sub.forEach((node, index) => {
        node.next = sub[index + 1] || null;
    }));
    return root;
};