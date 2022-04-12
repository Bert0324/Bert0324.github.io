/**
 * 暴力法
 * @param {number[]} weights
 * @param {number} days
 * @return {number}
 */
var shipWithinDays = function (weights, days) {
    const getDays = (weights, payload) => {
        let total = 0;
        let leftPayload = payload;
        for (let i = 0; i < weights.length; i++) {
            const crrLeftPayload = leftPayload - weights[i];
            // 运力不足
            if (crrLeftPayload < 0) {
                total += 1;
                leftPayload = payload - weights[i];
            } else {
                leftPayload = crrLeftPayload;
            }
        }
        total += 1;
        return total;
    };
    // 载荷不能小于最大重量
    let payload = Math.max(...weights);
    while (true) {
        const total = getDays(weights, payload);
        if (total <= days) return payload;
        payload += 1;
    }
};

/**
 * 二分查找
 * @param {number[]} weights
 * @param {number} days
 * @return {number}
 */
var shipWithinDays = function (weights, days) {
    const getDays = (weights, payload) => {
        let total = 0;
        let leftPayload = payload;
        for (let i = 0; i < weights.length; i++) {
            const crrLeftPayload = leftPayload - weights[i];
            // 运力不足
            if (crrLeftPayload < 0) {
                total += 1;
                leftPayload = payload - weights[i];
            } else {
                leftPayload = crrLeftPayload;
            }
        }
        total += 1;
        return total;
    };
    let left = Math.max(...weights);
    let right = 5 * (10 ** 4) * 500;
    while (left <= right) {
        const mid = ~~((left + right) / 2);
        const total = getDays(weights, mid);
        if (total === days) right = mid - 1;
        else if (total > days) left = mid + 1;
        else right = mid - 1;
    }
    return left;
};