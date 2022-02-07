/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function (nums, k) {
  let maxCount = 0;
  const map = {};
  nums.forEach((num) => {
    map[num] = (map[num] || 0) + 1;
    maxCount = Math.max(map[num], maxCount);
  });
  const buckets = [];
  Object.keys(map).forEach((num) => {
    const count = map[num];
    if (!buckets[count]) buckets[count] = [];
    buckets[count].push(num);
  });
  const res = [];
  for (let i = maxCount; i >= 0; i--) {
    if (k == 0) break;
    if (!buckets[i]?.length) continue;
    for (let j = 0; j < buckets[i].length; j++) {
      const num = buckets[i][j];
      res.push(num);
      k--;
    }
  }
  return res;
};
