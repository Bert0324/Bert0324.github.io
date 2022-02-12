/**
 * 双指针
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
  const arr = [...nums].sort((a, b) => a - b);
  let p1 = 0;
  let p2 = arr.length - 1;
  while (p1 < p2) {
    const v = arr[p1] + arr[p2];
    if (v > target) {
      p2--;
    } else if (v < target) {
      p1++;
    } else {
      const i1 = nums.findIndex((v) => v === arr[p1]);
      const i2 = nums.findIndex((v, i) => i !== i1 && v === arr[p2]);
      return [i1, i2];
    }
  }
};

/**
 * 哈希法
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
  const map = {};
  for (let i1 = 0; i1 < nums.length; i1++) {
    const i2 = map[target - nums[i1]];
    if (i2 !== undefined) return [i1, i2];
    else map[nums[i1]] = i1;
  }
};
