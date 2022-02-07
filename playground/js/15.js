/**
 * 暴力法
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
  const ret = [];
  for (let i1 = 0; i1 < nums.length; i1++) {
    for (let i2 = 0; i2 < nums.length; i2++) {
      if (i1 === i2) continue;
      for (let i3 = 0; i3 < nums.length; i3++) {
        if (i2 === i3 || i1 === i3) continue;
        const a = nums[i1];
        const b = nums[i2];
        const c = nums[i3];
        if (a + b + c === 0) {
          const v = [a, b, c].sort((a, b) => a - b).join(",");
          if (!ret.includes(v)) ret.push(v);
        }
      }
    }
  }
  return ret.map((v) => v.split(","));
};

/**
 * 优化思路 => a <= b <=c
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
  const ret = [];
  nums.sort((a, b) => a - b);
  for (let i1 = 0; i1 < nums.length; i1++) {
    for (let i2 = i1 + 1; i2 < nums.length; i2++) {
      for (let i3 = i2 + 1; i3 < nums.length; i3++) {
        const a = nums[i1];
        const b = nums[i2];
        const c = nums[i3];
        if (a + b + c === 0) {
          const v = [a, b, c].sort((a, b) => a - b).join(",");
          if (!ret.includes(v)) {
            ret.push(v);
            break;
          }
        }
      }
    }
  }
  return ret.map((v) => v.split(","));
};

/**
 * 双指针
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
  const ret = [];
  nums.sort((a, b) => a - b);
  for (let i1 = 0; i1 < nums.length; i1++) {
    const a = nums[i1];
    let p1 = i1 + 1;
    let p2 = nums.length - 1;
    while (p1 < p2) {
      const b = nums[p1];
      for (let i2 = p1 + 1; i2 <= p2; i2++) {
        const c = nums[i2];
        if (a + b + c === 0) {
          const v = [a, b, c].sort((a, b) => a - b).join(",");
          if (!ret.includes(v)) ret.push(v);
          p2 = i2 - 1;
          break;
        }
      }
      p1 += 1;
    }
  }
  return ret.map((v) => v.split(","));
};

/**
 * 双指针优化
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
  const ret = [];
  nums.sort((a, b) => a - b);
  for (let i1 = 0; i1 < nums.length; i1++) {
    const a = nums[i1];
    if (a > 0) return ret;
    if (i1 > 0 && a === nums[i1 - 1]) continue;
    let p1 = i1 + 1;
    let p2 = nums.length - 1;
    while (p1 < p2) {
      const v = a + nums[p1] + nums[p2];
      if (v > 0) {
        p2 -= 1;
      } else if (v < 0) {
        p1 += 1;
      } else {
        ret.push([a, nums[p1], nums[p2]]);
        while (p1 < p2 && nums[p1] === nums[p1 + 1]) p1 += 1;
        while (p1 < p2 && nums[p2] === nums[p2 - 1]) p2 -= 1;
        p1 += 1;
        p2 -= 1;
      }
    }
  }
  return ret;
};
