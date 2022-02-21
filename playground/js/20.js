/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
	if (s.length % 2 === 1) return false;
	const stack = [];
	const map = {
		')': '(',
		']': '[',
		'}': '{'
	};
	for (let char of s) {
		if (map[char]) {
			const last = stack.pop();
			if (last !== map[char]) return false;
		} else {
			stack.push(char);
		}
	}
	return !stack.length;
};
