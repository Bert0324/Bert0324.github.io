/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function (intervals) {
  const ret = [];
  // 根据起始位置排序
  intervals.sort((a, b) => a[0] - b[0]);
  let prev = intervals[0];
  for (let i = 0; i < intervals.length; i++) {
    // 区间重合
    if (prev[1] >= intervals[i][0]) {
      prev[1] = Math.max(intervals[i][1], prev[1]);
      // 区间不重合
    } else {
      ret.push(prev);
      prev = intervals[i];
    }
  }
  // 最后一个区间遇不到和他不重合的区间，手动push
  ret.push(prev);
  return ret;
};
