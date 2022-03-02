/**
 * 顺序合并
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function (lists) {
  const dummy = new ListNode(0);
  const nodes = [...lists].filter(Boolean);
  let crr = dummy;
  while (nodes.length) {
    let minIndex = 0;
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].val < nodes[minIndex].val) minIndex = i;
    }
    crr.next = nodes[minIndex];
    crr = nodes[minIndex];
    if (nodes[minIndex].next !== null) {
      nodes[minIndex] = nodes[minIndex].next;
    } else {
      nodes.splice(minIndex, 1);
    }
  }
  return dummy.next;
};

/**
 * 分治法
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function (lists) {
  const arr = lists.filter(Boolean);
  if (!arr.length) return null;
  // 合并两个排序链表
  const mergeTwoLists = function (list1, list2) {
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
  const merge = (start, end) => {
    if (start + 1 == end) return arr[start];
    // 输入的k个排序链表，可以分成两部分，前k/2个链表和后k/2个链表
    // 如果将这前k/2个链表和后k/2个链表分别合并成两个排序的链表，再将两个排序的链表合并，那么所有链表都合并了
    const mid = (start + end) >> 1;
    return mergeTwoLists(merge(start, mid), merge(mid, end));
  };
  // 前闭后开区间
  return merge(0, arr.length);
};
