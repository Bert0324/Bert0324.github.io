/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function (list1, list2) {
  const dummy = new ListNode(0);
  let crr1 = list1;
  let crr2 = list2;
  let crr = dummy;
  while (crr1 || crr2) {
    if (
      (crr1?.val === undefined ? Infinity : crr1.val) <=
      (crr2?.val === undefined ? Infinity : crr2.val)
    ) {
      crr.next = crr1;
      crr = crr1;
      crr1 = crr1.next;
    } else {
      crr.next = crr2;
      crr = crr2;
      crr2 = crr2.next;
    }
  }
  return dummy.next;
};
