/**
 * @param {number[]} nums
 * @param {number} m
 * @return {number}
 */
var splitArray = function (nums, m) {
    const getMLength = (nums, payload) => {
        let total = 0;
        let leftPayload = payload;
        for (let i = 0; i < nums.length; i++) {
            const crrLeftPayload = leftPayload - nums[i];
            if (crrLeftPayload < 0) {
                total += 1;
                leftPayload = payload - nums[i];
            } else {
                leftPayload = crrLeftPayload;
            }
        }
        total += 1;
        return total;
    };
    let left = Math.max(...nums);
    let right = nums.reduce((acc, crr) => acc + crr, 0);
    while (left <= right) {
        const mid = ~~((left + right) / 2);
        const total = getMLength(nums, mid);
        if (total === m) right = mid - 1;
        else if (total > m) left = mid + 1;
        else right = mid - 1;
    }
    return left;
};