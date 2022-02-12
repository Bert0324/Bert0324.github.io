/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function (nums) {
  const ret = [];
  const backtrack = (track) => {
    if (track.length === nums.length) return ret.push([...track]);
    for (let i = 0; i < nums.length; i++) {
      if (track.includes(nums[i])) continue;
      track.push(nums[i]);
      backtrack(track);
      track.pop();
    }
  };
  backtrack([]);
  return ret;
};
