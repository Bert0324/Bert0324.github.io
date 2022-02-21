/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function(height) {
	let p1 = 0;
	let p2 = height.length - 1;
	let ret = 0;
	while (p1 < p2) {
		if (height[p1] <= height[p2]) {
			ret = Math.max(ret, (p2 - p1) * height[p1]);
			p1++;
		} else {
			ret = Math.max(ret, (p2 - p1) * height[p2]);
			p2--;
		}
	}
	return ret;
};