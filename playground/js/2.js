/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
  const dummy = new ListNode(0);
  const next = [l1, l2];
  let crr = dummy;
  let place = 0;
  while (next[0] || next[1]) {
    let v = `${(next[0]?.val || 0) + (next[1]?.val || 0) + place}`;
    if (v.length > 1) {
      place = 1;
      v = v[1];
    } else {
      place = 0;
    }
    const node = next[0] || next[1];
    next[0] = next[0]?.next;
    next[1] = next[1]?.next;
    node.val = ~~v;
    crr.next = node;
    crr = node;
  }
  if (place) crr.next = new ListNode(1);
  return dummy.next;
};
