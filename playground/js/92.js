/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}

/**
 * @param {ListNode} head
 * @param {number} left
 * @param {number} right
 * @return {ListNode}
 */
var reverseBetween = function (head, left, right) {
	const reverse = (head, tail) => {
		let prev = null;
		let crr = head;
		while (crr) {
			const next = crr.next;
			crr.next = prev;
			if (crr === tail) break;
			prev = crr;
			crr = next;
		}
	};
	const dummy = new ListNode(0, head);
	let localHead, localTail, localHeadLast;
	let position = 0;
	let crr = dummy;
	while (!localHead || !localTail || !localHeadLast) {
		if (position === left - 1) localHeadLast = crr;
		if (position === left) localHead = crr;
		if (position === right) localTail = crr;
		position += 1;
		crr = crr.next;
	}
	const next = localTail.next;
	reverse(localHead, localTail);
	localHeadLast.next = localTail;
	localHead.next = next;
	return dummy.next;
};
