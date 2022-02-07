const reverseList = (head, tail) => {
  let prev = tail.next;
  let crr = head;
  while (prev !== tail) {
    const next = crr.next;
    crr.next = prev;
    prev = crr;
    crr = next;
  }
  return [tail, head];
};

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var reverseKGroup = function (head, k) {
  const dummyHead = new ListNode(0, head);
  let prev = dummyHead;
  while (head) {
    let tail = prev;
    for (let i = 0; i < k; i++) {
      tail = tail.next;
      if (!tail) return dummyHead.next;
    }
    const next = tail.next;
    [head, tail] = reverseList(head, tail);
    prev.next = head;
    tail.next = next;
    prev = tail;
    head = tail.next;
  }
  return dummyHead.next;
};
