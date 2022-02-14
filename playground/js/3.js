/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
	const window = [];
	const valid = () => window.length === new Set(window).size;
	let left = 0;
	let right = 0;
	const ret = [];
	while (right < s.length) {
		const rightC = s[right];
		window.push(rightC);
		while (valid()) {
			ret.push([left, right]);
			const leftC = s[left];
			window.splice(window.findIndex(v => v === leftC), 1);
			left++;
		}
		right++;
	}
	if (!ret.length) return '';
	const lengths = ret.map(([l, r]) => r - l);
	const [l, r] = ret[lengths.findIndex(v => [...lengths].sort((a, b) => a - b).pop() === v)];
	return s.slice(l, r + 1);
};
