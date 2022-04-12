/**
 * 暴力法
 * @param {number[]} piles
 * @param {number} h
 * @return {number}
 */
var minEatingSpeed = function (piles, h) {
    let K = 1;
    while (true) {
        const total = piles.reduce((acc, crr) => Math.ceil(crr / K) + acc, 0);
        if (total <= h) return K;
        K += 1;
    }
};

/**
 * 二分查找
 * @param {number[]} piles
 * @param {number} h
 * @return {number}
 */
var minEatingSpeed = function (piles, h) {
    let left = 1;
    let right = 10 ** 9;
    while (left <= right) {
        const mid = ~~((left + right) / 2);
        const total = piles.reduce((acc, crr) => Math.ceil(crr / mid) + acc, 0);
        if (total === h) right = mid - 1;
        else if (total > h) left = mid + 1;
        else right = mid - 1;
    }
    return left;
};