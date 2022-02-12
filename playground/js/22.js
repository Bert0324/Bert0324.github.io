/**
 * 回溯法
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function (n) {
  const ret = [];
  const nums = [...Array(n).fill("("), ...Array(n).fill(")")];
  const backtrack = (track, is) => {
    if (track.length === nums.length) {
      const v = track.join("");
      if (!ret.includes(v)) ret.push(v);
      return;
    }
    for (let i = 0; i < nums.length; i++) {
      if (is.includes(i)) continue;
      if (
        nums[i] === ")" &&
        track.filter((v) => v === ")").length + 1 >
          track.filter((v) => v === "(").length
      )
        break;
      track.push(nums[i]);
      backtrack(track, [...is, i]);
      track.pop();
    }
  };
  backtrack([], []);
  return ret;
};

/**
 * 回溯法优化时间复杂度
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function (n) {
  const ret = [];
  const backtrack = (left, right, track) => {
    if (right < left) return;
    if (left < 0 || right < 0) return;
    if (left === 0 && right === 0) return ret.push(track.join(""));

    track.push("(");
    backtrack(left - 1, right, track);
    track.pop();

    track.push(")");
    backtrack(left, right - 1, track);
    track.pop();
  };
  backtrack(n, n, []);
  return ret;
};
