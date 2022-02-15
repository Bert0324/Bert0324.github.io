/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
	const window = {};
	let ret = 0;
	let left = 0;
	let right = 0;
	while (right < s.length) {
		const rightC = s[right];
		window[rightC] = (window[rightC] || 0) + 1;
		while (window[rightC] > 1) {
			const leftC = s[left];
			window[leftC]--;
			left++;
		}
		right++;
		ret = Math.max(ret, right - left);
	}
	return ret;
};
