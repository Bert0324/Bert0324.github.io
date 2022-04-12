/**
 * // Definition for a Node.
 * function Node(val, next, random) {
 *    this.val = val;
 *    this.next = next;
 *    this.random = random;
 * };
 */

/**
 * @param {Node} head
 * @return {Node}
 */
var copyRandomList = function (head) {
    if (!head) return head;
    const arr = [head];
    let crr = head;
    while (crr) {
        const next = crr.next;
        if (next) arr.push(next);
        crr = next;
    }
    const dummy = new Node(0, null, null);
    const list = arr.map(({ val }) => new Node(val, null, null));
    arr.forEach((node, index) => {
        const randomIndex = arr.findIndex(item => item === node.random);
        list[index].random = list[randomIndex] || null;
    });
    crr = dummy;
    while (list.length) {
        const node = list.shift();
        crr.next = node;
        crr = node;
    }
    return dummy.next;
};