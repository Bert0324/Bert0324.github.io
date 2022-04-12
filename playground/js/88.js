/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function (nums1, m, nums2, n) {
    nums1.splice(m, n);
    let p1 = 0;
    let p2 = 0;
    while (p2 < n) {
        const v = nums2[p2];
        while (nums1[p1] <= v && p1 < nums1.length) p1++;
        nums1.splice(p1, 0, v);
        p2++;
    }
    return nums1;
};