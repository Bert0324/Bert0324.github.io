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

/**
 * 双指针-滑动窗口
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function (s, t) {
  const needMap = {};
  const window = {};
  for (let c of t) needMap[c] = (needMap[c] || 0) + 1;
  const keys = Object.keys(needMap);
  const valid = () => {
    for (let key of keys) if (!window[key] || window[key] < needMap[key]) return false;
    return true;
  };
  let left = 0;
  let right = 0;
  const ret = [];
  while (right < s.length) {
    const rightC = s[right];
    if (needMap[rightC]) window[rightC] = (window[rightC] || 0) + 1;
    while (valid()) {
      ret.push([left, right]);
      const leftC = s[left];
      if (needMap[leftC]) window[leftC]--;
      left++;
    }
    right++;
  }
  if (!ret.length) return '';
  const lengths = ret.map(([l, r]) => r - l);
  const [l, r] = ret[lengths.findIndex(v => [...lengths].sort((a, b) => a - b)[0] === v)];
  return s.slice(l, r + 1);
};


/**
 * 双指针-滑动窗口-优化
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function (s, t) {
  const window = {};
  const need = {};
  for (let c of t) need[c] = (need[c] || 0) + 1;
  let left = 0;
  let right = 0;
  let valid = 0;
  let start = 0;
  let len = Number.MAX_SAFE_INTEGER;
  while (right < s.length) {
    const c = s[right];
    right++;
    if (need[c]) {
      window[c] = (window[c] || 0) + 1;
      if (window[c] === need[c]) valid++;
    }
    while (valid === Object.keys(need).length) {
      if (right - left < len) {
          start = left;
          len = right - left;
      }
      const d = s[left];
      left++;
      if (need[d]) {
        if (window[d] === need[d]) valid--;
        window[d]--;
      }
    }
  }
  return len === Number.MAX_SAFE_INTEGER ? '' : s.slice(start, start + len);
};