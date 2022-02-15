/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
    const palindrome = (l, r) => {
		while (l >= 0 && r < s.length && s[l] === s[r]) {
			l--;
			r++;
		}
		return s.slice(l + 1, r);
	};
	let ret = '';
	for (let i = 0; i<s.length;i++) {
		const s1 = palindrome(i, i);
		const s2 = palindrome(i, i + 1);
		ret = ret.length > s1.length ? ret : s1;
		res = res.length > s2.length ? res : s2;
	}
	return ret;
};