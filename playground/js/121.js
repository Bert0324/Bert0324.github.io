/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  let max = -Infinity;
  let ret = 0;
  for (let i = prices.length - 1; i >= 0; i--) {
    const v = max - prices[i];
    max = Math.max(max, prices[i]);
    if (v > ret) ret = v;
  }
  return ret;
};
