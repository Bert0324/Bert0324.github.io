/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function (height) {
  let ret = 0;
  const size = height.length;
  if (!size) return ret;
  const leftMax = Array(size).fill(0);
  const rightMax = Array(size).fill(0);
  for (let i = 0; i < size; i++) {
    leftMax[i] = Math.max(
      leftMax[i - 1] === undefined ? -Infinity : leftMax[i - 1],
      height[i]
    );
  }
  for (let i = size - 1; i >= 0; i--) {
    rightMax[i] = Math.max(
      rightMax[i + 1] === undefined ? -Infinity : rightMax[i + 1],
      height[i]
    );
  }
  for (let i = 0; i < size; i++) {
    ret += Math.min(leftMax[i], rightMax[i]) - height[i];
  }
  return ret;
};
