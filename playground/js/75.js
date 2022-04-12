/**
 * 快排
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var sortColors = function (nums) {
    const quickSort = arr => {
        if (arr.length < 2) return arr;
        const pivot = arr.pop();
        return [...quickSort(arr.filter(item => item < pivot)), pivot, ...quickSort(arr.filter(item => item >= pivot))];
    };
    const ret = quickSort([...nums]);
    nums.forEach((_, i) => (nums[i] = ret[i]));
};

/**
 * 单指针
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var sortColors = function (nums) {
    const swap = (i1, i2) => {
        const v = nums[i1];
        nums[i1] = nums[i2];
        nums[i2] = v;
    };
    let p = 0;
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] === 0) {
            swap(i, p);
            p++;
        }
    }
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] === 1) {
            swap(i, p);
            p++;
        }
    }
}

/**
 * 双指针
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var sortColors = function (nums) {
    const swap = (i1, i2) => {
        if (i1 !== i2) {
            const v = nums[i1];
            nums[i1] = nums[i2];
            nums[i2] = v;
        }
    };
    let p1 = 0; // 1
    let p2 = 0; // 0
    nums.forEach((v, i) => {
        if (v === 1) {
            swap(i, p1);
            p1++;
        } else if (v === 0) {
            swap(i, p2);
            if (p2 < p1) swap(i, p1);
            p1++;
            p2++;
        }
    });
};