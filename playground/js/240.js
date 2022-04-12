/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function (matrix, target) {
    const binarySearch = (nums, target) => {
        if (!nums.length) return false;
        let left = 0;
        let right = nums.length - 1;
        // <= 保证 [n, n]这个区间是被考虑进去的
        while (left <= right) {
            const mid = ~~((left + right) / 2);
            if (nums[mid] === target) return true;
            else if (nums[mid] < target) left = mid + 1;
            else right = mid - 1;
        }
        return false;
    };
    for (let i = 0; i < matrix.length; i++) {
        const exist = binarySearch(matrix[i], target);
        if (exist) return true;
    }
    return false;
};

