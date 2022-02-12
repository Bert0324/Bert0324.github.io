/**
 * 暴力法
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function (s, t) {
  let ret = "";
  for (let i1 = 0; i1 < s.length; i1++) {
    const arr = Array.from(t);
    for (let i2 = i1; i2 < s.length; i2++) {
      const index = arr.findIndex((v) => v === s[i2]);
      if (i1 === 3) debugger;
      if (index > -1) {
        arr.splice(index, 1);
        if (arr.length === 0) {
          const v = s.slice(i1, i2 + 1);
          if (v.length < ret.length || !ret) ret = v;
          break;
        }
      }
    }
  }
  return ret;
};
minWindow("ADOBECODEBANC", "ABC");
